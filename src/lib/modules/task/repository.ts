import type { TaskLifecyclePort, AsyncTaskRecord, TaskLifecycleStatus } from './port';

export class TaskLifecycleRepository {
  private readonly taskLifecyclePortAdapter: TaskLifecyclePort;

  public constructor(taskLifecyclePortAdapter: TaskLifecyclePort) {
    this.taskLifecyclePortAdapter = taskLifecyclePortAdapter;
  }

  public async initiateTask(taskType: string): Promise<AsyncTaskRecord> {
    return this.taskLifecyclePortAdapter.createTask(taskType);
  }

  public async fetchTask(taskId: string): Promise<AsyncTaskRecord | null> {
    return this.taskLifecyclePortAdapter.getTaskById(taskId);
  }

  public async updateProgress(
    taskId: string,
    progressPercentage: number,
    status: TaskLifecycleStatus,
    resultPayload?: string
  ): Promise<AsyncTaskRecord> {
    return this.taskLifecyclePortAdapter.updateTaskProgress(taskId, progressPercentage, status, resultPayload);
  }
}
