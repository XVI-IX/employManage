import { ITaskRepository } from '../domain/repositories/tasks.repository';

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
