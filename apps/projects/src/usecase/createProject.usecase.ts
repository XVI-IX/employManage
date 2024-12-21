import { IEmployeeRepository } from 'apps/employees/src/domain/repositories';
import { IProjectRepository } from '../domain/repositories';
import { CreateProjectInput } from '../infrastructure/common/schemas/createProjectInput.schema';
import { NotFoundException } from '@nestjs/common';
import { IDepartmentRepository } from 'apps/departments/src/domain/repositories';

export class CreateProjectUseCase {
  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly employeeRepository: IEmployeeRepository,
    private readonly departmentRepository: IDepartmentRepository,
  ) {}

  async createProject(project: CreateProjectInput) {
    const supervisorExists = await this.employeeRepository.findOne({
      where: {
        id: project.supervisorId,
      },
    });

    if (!supervisorExists) {
      throw new NotFoundException('Supervisor does not exist');
    }

    const departmentExists = await this.departmentRepository.findOne({
      where: {
        id: project.departmentId,
      },
    });

    if (!departmentExists) {
      throw new NotFoundException('Department does not exist');
    }

    const savedProject = await this.projectRepository.save(project);

    return savedProject;
  }
}
