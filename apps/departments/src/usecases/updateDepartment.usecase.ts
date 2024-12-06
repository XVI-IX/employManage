import { BadRequestException } from '@nestjs/common';
import { DepartmentModel } from '../domain/models/department.model';
import { IDepartmentRepository } from '../domain/repositories';

export class updateDepartmentUseCase {
  constructor(private readonly departmentRepository: IDepartmentRepository) {}

  async updateDepartment(
    departmentId: string,
    data: Partial<DepartmentModel>,
  ): Promise<DepartmentModel> {
    const department = await this.departmentRepository.findOne({
      where: {
        id: departmentId,
      },
    });

    if (!department) {
      throw new BadRequestException('Department could not be retrieved');
    }

    const updatedDepartment = await this.departmentRepository.update(
      departmentId,
      data,
    );

    if (!updatedDepartment) {
      throw new BadRequestException('Department could not be updated');
    }

    return updatedDepartment;
  }
}
