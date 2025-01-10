import { TasksModel } from '../domain/models/tasks.model';
import { ITaskRepository } from '../domain/repositories/tasks.repository';

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async updateTaskRepository(
    id: string,
    data: Partial<TasksModel>,
  ): Promise<TasksModel> {
    await this.taskRepository.update(id, data);

    const task = await this.taskRepository.findOne({
      where: {
        id: data.id,
      },
    });

    return task;
  }
}
