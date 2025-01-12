import { IProjectRepository } from '../domain/repositories';

export class GetAllProjectAssigneesUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async getAllProjectAssignees(projectId: string) {
    return await this.projectRepository.getAllProjectAssignees(projectId);
  }
}
