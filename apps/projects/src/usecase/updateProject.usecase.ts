import { ProjectModel } from '../domain/model';
import { IProjectRepository } from '../domain/repositories';

export class UpdateProjectUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async updateProject(projectId: string, project: Partial<ProjectModel>) {
    return await this.projectRepository.update(projectId, project);
  }
}
