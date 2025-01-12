import { IProjectRepository } from '../domain/repositories';

export class DeleteProjectUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async deleteProject(projectId: string) {
    return await this.projectRepository.delete(projectId);
  }
}
