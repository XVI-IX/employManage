import { TasksModel } from '../domain/models/tasks.model';
import { ITaskRepository } from '../domain/repositories/tasks.repository';

export class GetTasksByStatus {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async getTasksByStatus(status: string): Promise<TasksModel[]> {
    const tasks = await this.taskRepository.findTasksByStatus(status);

    return tasks;
  }
}
