import { TasksModel } from '../domain/models/tasks.model';
import { ITaskRepository } from '../domain/repositories/tasks.repository';

export class GetTaskByIdUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async getTaskById(id: string): Promise<TasksModel> {
    const task = await this.taskRepository.findOne({
      where: {
        id,
      },
    });

    return task;
  }
}
