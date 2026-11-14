import type { TaskLifecyclePort, AsyncTaskRecord, TaskLifecycleStatus } from '$lib/modules/task';

export class MockTaskLifecycleAdapter implements TaskLifecyclePort {
  private readonly tasksMap: Map<string, AsyncTaskRecord> = new Map();

  public async createTask(taskType: string): Promise<AsyncTaskRecord> {
    const taskId = `task-${crypto.randomUUID()}`;
    const newTask: AsyncTaskRecord = {
      taskId,
      taskType,
      status: 'PENDING',
      progressPercentage: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasksMap.set(taskId, newTask);

    // Simulasi asinkron berpindah ke PROCESSING dan COMPLETED dalam hitungan detik
    setTimeout(() => {
      const existingTask = this.tasksMap.get(taskId);
      if (existingTask) {
        this.tasksMap.set(taskId, {
          ...existingTask,
          status: 'PROCESSING',
          progressPercentage: 50,
          updatedAt: new Date(),
        });
      }
    }, 100);

    setTimeout(() => {
      const existingTask = this.tasksMap.get(taskId);
      if (existingTask) {
        this.tasksMap.set(taskId, {
          ...existingTask,
          status: 'COMPLETED',
          progressPercentage: 100,
          resultPayload: `/downloads/${taskType}-${Date.now()}.csv`,
          updatedAt: new Date(),
        });
      }
    }, 300);

    return newTask;
  }

  public async getTaskById(taskId: string): Promise<AsyncTaskRecord | null> {
    const taskRecord = this.tasksMap.get(taskId);
    return taskRecord ? { ...taskRecord } : null;
  }

  public async updateTaskProgress(
    taskId: string,
    progressPercentage: number,
    status: TaskLifecycleStatus,
    resultPayload?: string
  ): Promise<AsyncTaskRecord> {
    const existingTask = this.tasksMap.get(taskId);
    if (!existingTask) {
      throw new Error(`Task '${taskId}' tidak ditemukan`);
    }

    const updatedTask: AsyncTaskRecord = {
      ...existingTask,
      progressPercentage,
      status,
      resultPayload: resultPayload ?? existingTask.resultPayload,
      updatedAt: new Date(),
    };

    this.tasksMap.set(taskId, updatedTask);
    return { ...updatedTask };
  }
}
