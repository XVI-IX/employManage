import { IProjectRepository } from '../domain/repositories';

export class GetAllDueProjectsUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async getAllDueProjects() {
    return await this.projectRepository.getAllDueProjects();
  }
}
