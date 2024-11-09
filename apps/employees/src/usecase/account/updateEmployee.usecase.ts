import { NotFoundException } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories';
import {
  Employee,
  UpdateEmployeeInput,
} from '../../infrastructure/common/schemas/account.schema';

export class UpdateEmployeeUseCase {
  constructor(private readonly employeeRepository: IEmployeeRepository) {}

  async updateEmployee(
    employeeId: string,
    data: UpdateEmployeeInput,
  ): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const updatedEmployee = await this.employeeRepository.update(
      employeeId,
      data,
    );

    return {
      id: updatedEmployee.id,
      email: updatedEmployee.email,
      firstName: updatedEmployee.firstName,
      lastName: updatedEmployee.lastName,
      avatarUrl: updatedEmployee.avatarUrl,
      createdAt: updatedEmployee.createdAt,
      updatedAt: updatedEmployee.updatedAt,
      jobTitle: updatedEmployee.jobTitle,
      hireDate: updatedEmployee.hireDate,
      phone: updatedEmployee.phone,
    };
  }
}
