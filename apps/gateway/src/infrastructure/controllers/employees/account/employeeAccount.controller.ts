import { Body, Controller, Get, Inject, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateEmployeeInput } from 'apps/employees/src/infrastructure/common/schemas/account.schema';

@Controller('/api/v1/employee/account')
export class EmployeeAccountController {
  constructor(
    @Inject('EMPLOYEE_SERVICE') private readonly employeeService: ClientProxy,
  ) {}

  @Get('/')
  async getAllEmployees() {
    return this.employeeService.send('getAllEmployees', {});
  }

  @Get('/:employeeId')
  async getEmployeeById(@Query('employeeId') employeeId: string) {
    return this.employeeService.send('getEmployeeById', { employeeId });
  }

  @Put('/:employeeId')
  async updateEmployee(
    @Query('employeeId') employeeId: string,
    @Body() data: UpdateEmployeeInput,
  ) {
    return this.employeeService.send('updateEmployee', { employeeId, ...data });
  }
}
