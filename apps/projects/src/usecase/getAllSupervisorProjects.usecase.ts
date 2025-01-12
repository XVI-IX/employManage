import { IProjectRepository } from '../domain/repositories';

export class GetAllSupervisorProjectsUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async getAllSupervisorProjects(supervisorId: string) {
    return await this.projectRepository.getAllSupervisorProjects(supervisorId);
  }
}
