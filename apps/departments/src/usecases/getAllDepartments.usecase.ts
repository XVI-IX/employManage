import { BadRequestException } from '@nestjs/common';
import { IDepartmentRepository } from '../domain/repositories';
import { DepartmentModel } from '../domain/models/department.model';

export class GetAllDepartmentsUseCase {
  constructor(private readonly departmentRepository: IDepartmentRepository) {}

  async getAllDepartments(): Promise<DepartmentModel[]> {
    const departments = await this.departmentRepository.find({});

    console.log('Departments:', departments);

    if (!departments) {
      throw new BadRequestException('Departments could not be retrieved');
    }

    return departments;
  }
}
