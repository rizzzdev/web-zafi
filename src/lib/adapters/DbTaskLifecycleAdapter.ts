import type { TaskLifecyclePort, AsyncTaskRecord, TaskLifecycleStatus } from '$lib/modules/task';
import { prisma } from '$lib/db';
import type { AsyncTask as PrismaAsyncTaskRecord } from '$lib/db/generated';

function mapPrismaAsyncTaskToRecord(taskRecord: PrismaAsyncTaskRecord): AsyncTaskRecord {
	const normalizedStatus = (
		['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'].includes(taskRecord.status)
			? taskRecord.status
			: 'PENDING'
	) as TaskLifecycleStatus;

	return {
		taskId: taskRecord.id,
		taskType: taskRecord.taskType,
		status: normalizedStatus,
		progressPercentage: taskRecord.progressPercentage,
		resultPayload: taskRecord.resultPayload ?? undefined,
		errorMessage: taskRecord.errorMessage ?? undefined,
		createdAt: taskRecord.createdAt,
		updatedAt: taskRecord.updatedAt
	};
}

export class DbTaskLifecycleAdapter implements TaskLifecyclePort {
	public async createTask(taskType: string): Promise<AsyncTaskRecord> {
		const createdTask = await prisma.asyncTask.create({
			data: {
				taskType,
				status: 'PENDING',
				progressPercentage: 0
			}
		});

		const taskId = createdTask.id;

		// Asynchronous background progress simulation yang persisten ke database
		setTimeout(async () => {
			try {
				await prisma.asyncTask.update({
					where: { id: taskId },
					data: {
						status: 'PROCESSING',
						progressPercentage: 50,
						updatedAt: new Date()
					}
				});
			} catch (progressError: unknown) {
				console.error(`Gagal mengupdate progress task ${taskId}:`, progressError);
			}
		}, 150);

		setTimeout(async () => {
			try {
				await prisma.asyncTask.update({
					where: { id: taskId },
					data: {
						status: 'COMPLETED',
						progressPercentage: 100,
						resultPayload: `/downloads/${taskType}-${Date.now()}.csv`,
						updatedAt: new Date()
					}
				});
			} catch (completeError: unknown) {
				console.error(`Gagal menyelesaikan task ${taskId}:`, completeError);
			}
		}, 400);

		return mapPrismaAsyncTaskToRecord(createdTask);
	}

	public async getTaskById(taskId: string): Promise<AsyncTaskRecord | null> {
		const matchedTask = await prisma.asyncTask.findUnique({
			where: { id: taskId }
		});

		if (!matchedTask) {
			return null;
		}

		return mapPrismaAsyncTaskToRecord(matchedTask);
	}

	public async updateTaskProgress(
		taskId: string,
		progressPercentage: number,
		status: TaskLifecycleStatus,
		resultPayload?: string
	): Promise<AsyncTaskRecord> {
		const updatedTask = await prisma.asyncTask.update({
			where: { id: taskId },
			data: {
				progressPercentage,
				status,
				resultPayload: resultPayload ?? null,
				updatedAt: new Date()
			}
		});

		return mapPrismaAsyncTaskToRecord(updatedTask);
	}
}
