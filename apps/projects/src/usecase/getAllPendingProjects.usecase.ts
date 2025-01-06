import { BadRequestException } from '@nestjs/common';
import { IProjectRepository } from '../domain/repositories';

export class GetAllPendingProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async getAllPendingProjects() {
    const projects = await this.projectRepository.getAllPendingProjects();

    if (!projects) {
      throw new BadRequestException('No pending projects found');
    }

    return projects;
  }
}
