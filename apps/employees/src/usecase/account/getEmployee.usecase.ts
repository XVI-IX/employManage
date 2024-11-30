import { NotFoundException } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories';
import { Employee } from '../../infrastructure/common/schemas/account.schema';

export class GetEmployeeUseCase {
  constructor(private readonly employeeRepository: IEmployeeRepository) {}

  async getProfile(employeeId: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee not Found');
    }

    return {
      id: employeeId,
      email: employee.email,
      firstName: employee.firstName,
      lastName: employee.lastName,
      avatarUrl: employee.avatarUrl,
      jobTitle: employee.jobTitle,
      phone: employee.phone,
      hireDate: employee.hireDate,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
    };
  }
}
