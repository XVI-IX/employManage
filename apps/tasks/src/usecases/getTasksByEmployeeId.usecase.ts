import { TasksModel } from '../domain/models/tasks.model';
import { ITaskRepository } from '../domain/repositories/tasks.repository';

export class GetTasksByEmployeeId {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async GetTasksByEmployeeId(employeeId: string): Promise<TasksModel[]> {
    const tasks = await this.taskRepository.findTasksByEmployeeId(employeeId);

    return tasks;
  }
}
