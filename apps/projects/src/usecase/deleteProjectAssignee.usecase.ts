import { IProjectRepository } from '../domain/repositories';

export class RemoveProjectAssigneeUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async removeProjectAssignee(projectId: string, assigneeId: string) {
    return await this.projectRepository.removeProjectAssignee(
      projectId,
      assigneeId,
    );
  }
}
