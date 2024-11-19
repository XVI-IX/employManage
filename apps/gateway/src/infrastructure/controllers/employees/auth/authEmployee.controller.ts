import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  LoginEmployeePasswordInput,
  RegisterEmployeeInput,
} from 'apps/employees/src/infrastructure/common/schemas/auth.schema';

@Controller('api/v1/auth/employee')
export class AuthEmployeeController {
  constructor(
    @Inject('EMPLOYEE_SERVICE') private readonly employeeService: ClientProxy,
  ) {}

  @Post('login')
  async loginEmployee(@Body() body: LoginEmployeePasswordInput) {
    return this.employeeService.send('loginEmployee', body);
  }

  @Post('register')
  async registerEmployee(@Body() body: RegisterEmployeeInput) {
    return this.employeeService.send('registerEmployee', body);
  }
}
