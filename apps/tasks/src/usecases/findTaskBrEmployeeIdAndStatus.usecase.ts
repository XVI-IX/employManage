import { TasksModel } from '../domain/models/tasks.model';
import { ITaskRepository } from '../domain/repositories/tasks.repository';

export class FindTaskByEmplyeeIdAndStatusUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async findTaskByEmployeeIdAndStatus(
    employeeId: string,
    status: string,
  ): Promise<TasksModel[]> {
    const tasks = await this.taskRepository.findTasksByEmployeeIdAndStatus(
      employeeId,
      status,
    );

    return tasks;
  }
}
