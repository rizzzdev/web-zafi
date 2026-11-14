export type TaskLifecycleStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface AsyncTaskRecord {
  readonly taskId: string;
  readonly taskType: string;
  readonly status: TaskLifecycleStatus;
  readonly progressPercentage: number;
  readonly resultPayload?: string;
  readonly errorMessage?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface TaskLifecyclePort {
  createTask(taskType: string): Promise<AsyncTaskRecord>;
  getTaskById(taskId: string): Promise<AsyncTaskRecord | null>;
  updateTaskProgress(taskId: string, progressPercentage: number, status: TaskLifecycleStatus, resultPayload?: string): Promise<AsyncTaskRecord>;
}
