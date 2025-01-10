import { TasksModel } from '../domain/models/tasks.model';
import { ITaskRepository } from '../domain/repositories/tasks.repository';

export class GetTaskByProjectIdUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async getTaskByProjectId(projectId: string): Promise<TasksModel[]> {
    const task = await this.taskRepository.findTasksByProjectId(projectId);

    return task;
  }
}
