import { BadRequestException } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories';
// import { Employee } from '../../infrastructure/common/schemas/account.schema';
import { EmployeeModel } from '../../domain/model';

export class GetAllEmployeesUseCase {
  constructor(private readonly employeeRepository: IEmployeeRepository) {}

  async getAllEmployees(): Promise<EmployeeModel[]> {
    const employees = await this.employeeRepository.find({});

    if (!employees) {
      throw new BadRequestException('Employees could not be retrieved');
    }

    return employees;
  }
}
