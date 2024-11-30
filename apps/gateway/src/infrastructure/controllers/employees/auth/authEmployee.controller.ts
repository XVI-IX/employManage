import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ForgotPasswordInput,
  LoginEmployeePasswordInput,
  RegisterEmployeeInput,
  ResetPasswordInput,
} from 'apps/employees/src/infrastructure/common/schemas/auth.schema';

@Controller('api/v1/auth/employee')
export class AuthEmployeeController {
  constructor(
    @Inject('EMPLOYEE_SERVICE') private readonly employeeService: ClientProxy,
  ) {}

  @Post('/login')
  async loginEmployee(@Body() body: LoginEmployeePasswordInput) {
    return this.employeeService.send('loginEmployee', body);
  }

  @Post('/register')
  async registerEmployee(@Body() body: RegisterEmployeeInput) {
    return this.employeeService.send('registerEmployee', body);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordInput) {
    return this.employeeService.send('forgotPasswordEmployee', body);
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: ResetPasswordInput) {
    return this.employeeService.send('resetPasswordEmployee', body);
  }

  @Get('/test')
  test() {
    console.log('Hit test');
    return this.employeeService.send('test', {});
  }
}
