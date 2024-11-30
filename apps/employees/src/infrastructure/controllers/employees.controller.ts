import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ForgotPasswordInput,
  LoginEmployeePasswordInput,
  RegisterEmployeeInput,
  ResetPasswordInput,
} from '../common/schemas/auth.schema';
import { GeneralUseCaseProxyModule } from '../usecase-proxy/general-usecase-proxy.module';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { LoginUseCase } from '../../usecase/auth/loginEmployee.usecase';
import { TestEmployeeUseCase } from '../../usecase/account/testEmployee.usecase';
import { RegisterEmployeeUseCase } from '../../usecase/auth/registerEmployee.usecase';
import { GetAllEmployeesUseCase } from '../../usecase/account/getAllEmployees.usecase';
import { ForgotPasswordEmployeeUseCase } from '../../usecase/auth/forgotPasswordEmployee.usecase';
import { ResetPasswordEmployeeUseCase } from '../../usecase/auth/resetPasswordEmployee.usecase';
import { HttpResponse } from '@app/common/infrastructure/helpers/response.helper';
import { GetEmployeeUseCase } from '../../usecase/account/getEmployee.usecase';
import { UpdateEmployeeInput } from '../common/schemas/account.schema';
import { UpdateEmployeeUseCase } from '../../usecase/account/updateEmployee.usecase';

@Controller()
export class EmployeesController {
  constructor(
    @Inject(GeneralUseCaseProxyModule.LOGIN_USE_CASE_PROXY)
    private readonly loginUseCaseProxy: UseCaseProxy<LoginUseCase>,
    @Inject(GeneralUseCaseProxyModule.REGISTER_USE_CASE_PROXY)
    private readonly registerUseCaseProxy: UseCaseProxy<RegisterEmployeeUseCase>,
    @Inject(GeneralUseCaseProxyModule.TEST_EMPLOYEE_USE_CASE_PROXY)
    private readonly testEmployeeUseCaseProxy: UseCaseProxy<TestEmployeeUseCase>,
    @Inject(GeneralUseCaseProxyModule.GET_ALL_EMPLOYEES_USE_CASE_PROXY)
    private readonly getAllEmployeesUseCaseProxy: UseCaseProxy<GetAllEmployeesUseCase>,
    @Inject(GeneralUseCaseProxyModule.FORGOT_PASSWORD_USE_CASE_PROXY)
    private readonly forgotPasswordUseCaseProxy: UseCaseProxy<ForgotPasswordEmployeeUseCase>,
    @Inject(GeneralUseCaseProxyModule.RESET_PASSWORD_USE_CASE_PROXY)
    private readonly resetPasswordUseCaseProxy: UseCaseProxy<ResetPasswordEmployeeUseCase>,
    @Inject(GeneralUseCaseProxyModule.GET_EMPLOYEE_BY_ID_USE_CASE_PROXY)
    private readonly getEmployeeByIdUseCaseProxy: UseCaseProxy<GetEmployeeUseCase>,
    @Inject(GeneralUseCaseProxyModule.UPDATE_EMPLOYEE_USE_CASE_PROXY)
    private readonly updateEmployeeUseCaseProxy: UseCaseProxy<UpdateEmployeeUseCase>,
  ) {}

  @MessagePattern('test')
  async test() {
    console.log('Hit test');
    return this.testEmployeeUseCaseProxy.getInstance().getTestEmployee();
  }

  @MessagePattern('loginEmployee')
  async loginEmployee(@Payload() data: LoginEmployeePasswordInput) {
    const response = await this.loginUseCaseProxy
      .getInstance()
      .loginWithPassword(data.email, data.password);

    return HttpResponse.send('Authentication successful', response);
  }

  @MessagePattern('registerEmployee')
  async registerEmployee(@Payload() data: RegisterEmployeeInput) {
    const response = await this.registerUseCaseProxy
      .getInstance()
      .registerEmployee(data);

    return HttpResponse.send('Employee registered successfully', response);
  }

  @MessagePattern('forgotPasswordEmployee')
  async forgotPasswordEmployee(@Payload() data: ForgotPasswordInput) {
    const response = await this.forgotPasswordUseCaseProxy
      .getInstance()
      .forgotPassword(data.email);

    return HttpResponse.send('Reset password email sent', response);
  }

  @MessagePattern('resetPasswordEmployee')
  async resetPasswordEmployee(@Payload() data: ResetPasswordInput) {
    const response = await this.resetPasswordUseCaseProxy
      .getInstance()
      .resetPassword(data.token, data.password);

    return HttpResponse.send('Password reset successfully', response);
  }

  @MessagePattern('getAllEmployees')
  async getAllEmployees() {
    const response = await this.getAllEmployeesUseCaseProxy
      .getInstance()
      .getAllEmployees();

    return HttpResponse.send('Employees retrieved successfully', response);
  }

  @MessagePattern('getEmployeeById')
  async getEmployeeById(@Payload() data: { employeeId: string }) {
    const response = await this.getEmployeeByIdUseCaseProxy
      .getInstance()
      .getProfile(data.employeeId);

    return HttpResponse.send('Employee retrieved successfully', response);
  }

  @MessagePattern('updateEmployee')
  async updateEmployee(@Payload() data: any) {
    const response = await this.updateEmployeeUseCaseProxy
      .getInstance()
      .updateEmployee(data.employeeId, data.data);

    return HttpResponse.send('Employee updated successfully', response);
  }
}
