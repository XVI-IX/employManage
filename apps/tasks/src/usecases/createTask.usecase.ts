import { TasksModel } from '../domain/models/tasks.model';
import { ITaskRepository } from '../domain/repositories/tasks.repository';
import { CreateTaskInput } from '../infrastructure/common/schemas/tasks.schema';

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  // TODO: Check if task with same name has been created for the department or project
  async createTaskRepository(data: CreateTaskInput): Promise<TasksModel> {
    const task = await this.taskRepository.save(data);

    return task;
  }
}
