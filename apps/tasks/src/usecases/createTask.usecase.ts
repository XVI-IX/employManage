import { IEmployeeRepository } from 'apps/employees/src/domain/repositories';
import { TasksModel } from '../domain/models/tasks.model';
import { ITaskRepository } from '../domain/repositories/tasks.repository';
import { CreateTaskInput } from '../infrastructure/common/schemas/tasks.schema';
import { IDepartmentRepository } from 'apps/departments/src/domain/repositories';
import { IProjectRepository } from 'apps/projects/src/domain/repositories';
import { ConflictException, NotFoundException } from '@nestjs/common';

export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly employeeRepository: IEmployeeRepository,
    // private readonly departmentRepository: IDepartmentRepository,
    private readonly projectRepository: IProjectRepository,
  ) {}

  // TODO: Check if task with same name has been created for the department or project
  async createTaskRepository(data: CreateTaskInput): Promise<TasksModel> {
    const employee = await this.employeeRepository.findOne({
      where: {
        id: data.employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee with id not found');
    }

    const project = await this.projectRepository.findOne({
      where: {
        id: data.projectId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project with id not found');
    }

    const checkTaskExists = await this.taskRepository.findOne({
      where: {
        name: data.name,
        projectId: data.projectId,
      },
    });

    if (checkTaskExists) {
      throw new ConflictException('Task with name already exists');
    }

    // const deparment = await this.departmentRepository.findOne(data)

    const task = await this.taskRepository.save(data);

    return task;
  }
}
