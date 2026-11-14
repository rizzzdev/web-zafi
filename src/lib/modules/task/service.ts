import { TaskLifecycleRepository } from './repository';
import type { AsyncTaskRecord, TaskLifecycleStatus } from './port';

export class TaskLifecycleService {
  private readonly taskLifecycleRepository: TaskLifecycleRepository;

  public constructor(taskLifecycleRepository: TaskLifecycleRepository) {
    this.taskLifecycleRepository = taskLifecycleRepository;
  }

  public async startExportTask(exportTaskType: string): Promise<AsyncTaskRecord> {
    return this.taskLifecycleRepository.initiateTask(exportTaskType);
  }

  public async checkTaskStatus(taskId: string): Promise<AsyncTaskRecord | null> {
    return this.taskLifecycleRepository.fetchTask(taskId);
  }

  public async progressTask(
    taskId: string,
    progressPercentage: number,
    status: TaskLifecycleStatus,
    resultPayload?: string
  ): Promise<AsyncTaskRecord> {
    return this.taskLifecycleRepository.updateProgress(taskId, progressPercentage, status, resultPayload);
  }
}
