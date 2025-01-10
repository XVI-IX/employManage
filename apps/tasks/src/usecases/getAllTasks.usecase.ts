import { TasksModel } from '../domain/models/tasks.model';
import { ITaskRepository } from '../domain/repositories/tasks.repository';

export class GetAllTasksUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async getAllTasksUseCase(): Promise<TasksModel[]> {
    const tasks = await this.taskRepository.find({
      orderBy: 'createdAt',
    });

    return tasks;
  }
}
