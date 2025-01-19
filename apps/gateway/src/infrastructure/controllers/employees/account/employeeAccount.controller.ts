import { Body, Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateEmployeeInput } from 'apps/employees/src/infrastructure/common/schemas/account.schema';

@Controller('/api/v1/employee/account')
export class EmployeeAccountController {
  constructor(
    @Inject('EMPLOYEE_SERVICE') private readonly employeeService: ClientProxy,
  ) {}

  @Get('/')
  async getAllEmployees() {
    try {
      return this.employeeService.send('getAllEmployees', {});
    } catch (error) {
      throw error;
    }
  }

  @Get('/:employeeId')
  async getEmployeeById(@Param('employeeId') employeeId: string) {
    try {
      return this.employeeService.send('getEmployeeById', { employeeId });
    } catch (error) {
      throw error;
    }
  }

  @Put('/:employeeId')
  async updateEmployee(
    @Param('employeeId') employeeId: string,
    @Body() data: UpdateEmployeeInput,
  ) {
    try {
      return this.employeeService.send('updateEmployee', { employeeId, data });
    } catch (error) {
      throw error;
    }
  }
}
