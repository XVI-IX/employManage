import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IProjectRepository } from '../domain/repositories';
import { IEmployeeRepository } from 'apps/employees/src/domain/repositories';

export class AddProjectAssigneeUseCase {
  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  async addProjectAssignee(projectId: string, assigneeId: string) {
    const projectExists = await this.projectRepository.findOne({
      where: {
        id: projectId,
      },
    });

    if (!projectExists) {
      throw new NotFoundException('Project not found');
    }

    const employeeExists = await this.employeeRepository.findOne({
      where: {
        id: assigneeId,
      },
    });

    if (!employeeExists) {
      throw new NotFoundException('Employee not found');
    }

    const project = await this.projectRepository.addProjectAssignee(
      projectId,
      assigneeId,
    );

    if (!project) {
      throw new BadRequestException('Project not found');
    }

    return project;
  }
}
