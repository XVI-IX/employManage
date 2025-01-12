import { BadRequestException } from '@nestjs/common';
import { IProjectRepository } from '../domain/repositories';

export class getAllCompletedProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async getAllCompletedProjects() {
    const projects = await this.projectRepository.getAllCompletedProjects();

    if (!projects) {
      throw new BadRequestException('No completed projects found');
    }

    return projects;
  }
}
