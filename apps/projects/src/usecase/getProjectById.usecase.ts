import { IProjectRepository } from '../domain/repositories';

export class GetProjectByIdUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async getProjectById(projectId: string) {
    return await this.projectRepository.findOne({
      where: {
        id: projectId,
      },
    });
  }
}
