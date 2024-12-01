import { BadRequestException } from '@nestjs/common';
import { IDepartmentRepository } from '../domain/repositories';
import { DepartmentModel } from '../domain/models/department.model';

export class GetDepartmentById {
  constructor(private departmentRepository: IDepartmentRepository) {}

  async getDepartmentById(departmentId: string): Promise<DepartmentModel> {
    const department = await this.departmentRepository.findOne({
      where: {
        id: departmentId,
      },
    });

    if (!department) {
      throw new BadRequestException('Department not found');
    }

    return department;
  }
}
