import { Public } from '@app/common/infrastructure/decorators';
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
  @Public()
  async loginEmployee(@Body() body: LoginEmployeePasswordInput) {
    try {
      return this.employeeService.send('loginEmployee', body);
    } catch (error) {
      throw error;
    }
  }

  @Post('/register')
  @Public()
  async registerEmployee(@Body() body: RegisterEmployeeInput) {
    try {
      return this.employeeService.send('registerEmployee', body);
    } catch (error) {
      throw error;
    }
  }

  @Post('/forgot-password')
  @Public()
  async forgotPassword(@Body() body: ForgotPasswordInput) {
    try {
      return this.employeeService.send('forgotPasswordEmployee', body);
    } catch (error) {
      throw error;
    }
  }

  @Post('/reset-password')
  @Public()
  async resetPassword(@Body() body: ResetPasswordInput) {
    try {
      return this.employeeService.send('resetPasswordEmployee', body);
    } catch (error) {
      throw error;
    }
  }

  @Get('/test')
  @Public()
  test() {
    console.log('Hit test');
    return this.employeeService.send('test', {});
  }
}
