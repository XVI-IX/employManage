import { BadRequestException, ConflictException } from '@nestjs/common';
import { DepartmentModel } from '../domain/models/department.model';
import { IDepartmentRepository } from '../domain/repositories';
import { CreateDepartmentInput } from '../infrastructure/common/schemas/department.schema';

export class CreateDepartmentUseCase {
  constructor(private readonly departmentRepository: IDepartmentRepository) {}

  async createDepartment(
    data: CreateDepartmentInput,
  ): Promise<DepartmentModel> {
    const checkExists = await this.departmentRepository.findOne({
      where: {
        name: data.name,
      },
    });

    if (checkExists) {
      throw new ConflictException('Department already exists');
    }

    const department = await this.departmentRepository.save(data);

    if (!department) {
      throw new BadRequestException('Department could not be created');
    }

    return department;
  }
}
