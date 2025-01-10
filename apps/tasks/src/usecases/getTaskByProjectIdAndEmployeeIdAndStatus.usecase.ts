import { TasksModel } from '../domain/models/tasks.model';
import { ITaskRepository } from '../domain/repositories/tasks.repository';

export class GetTaskByProjectIdAndEmployeeIdAndStatusUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async getTaskByProjectIdAndEmployeeIdAndStatus(
    projectId: string,
    employeeId: string,
    status: string,
  ): Promise<TasksModel[]> {
    const tasks =
      await this.taskRepository.findTasksByProjectIdAndEmployeeIdAndStatus(
        projectId,
        employeeId,
        status,
      );

    return tasks;
  }
}
