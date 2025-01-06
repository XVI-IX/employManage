import { IProjectRepository } from '../domain/repositories';

export class GetAllProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async getAllProjects() {
    return await this.projectRepository.find({});
  }
}
