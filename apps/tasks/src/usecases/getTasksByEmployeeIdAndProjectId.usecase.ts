import { TasksModel } from '../domain/models/tasks.model';
import { ITaskRepository } from '../domain/repositories/tasks.repository';

export class GetTasksByProjectIdAndEmployeeIdUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async getTasksByEmployeeIdAndProjectId(
    employeeId: string,
    projectId: string,
  ): Promise<TasksModel[]> {
    const tasks = await this.taskRepository.findTasksByProjectIdAndEmployeeId(
      projectId,
      employeeId,
    );

    return tasks;
  }
}
