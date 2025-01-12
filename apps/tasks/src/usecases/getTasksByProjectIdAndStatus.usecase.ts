import { TasksModel } from '../domain/models/tasks.model';
import { ITaskRepository } from '../domain/repositories/tasks.repository';

export class GetTasksByProjectIdAndStatus {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async getTasksByProjectIdAndStatus(
    projectId: string,
    status: string,
  ): Promise<TasksModel[]> {
    const tasks = await this.taskRepository.findTasksByProjectIdAndStatus(
      projectId,
      status,
    );

    return tasks;
  }
}
