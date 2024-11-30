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
  ) {}

  @MessagePattern('test')
  async test() {
    console.log('Hit test');
    return this.testEmployeeUseCaseProxy.getInstance().getTestEmployee();
  }

  @MessagePattern('loginEmployee')
  async loginEmployee(@Payload() data: LoginEmployeePasswordInput) {
    return await this.loginUseCaseProxy
      .getInstance()
      .loginWithPassword(data.email, data.password);
  }

  @MessagePattern('registerEmployee')
  async registerEmployee(@Payload() data: RegisterEmployeeInput) {
    return await this.registerUseCaseProxy.getInstance().registerEmployee(data);
  }

  @MessagePattern('forgotPasswordEmployee')
  async forgotPasswordEmployee(@Payload() data: ForgotPasswordInput) {
    return await this.forgotPasswordUseCaseProxy
      .getInstance()
      .forgotPassword(data.email);
  }

  @MessagePattern('resetPasswordEmployee')
  async resetPasswordEmployee(@Payload() data: ResetPasswordInput) {
    return await this.resetPasswordUseCaseProxy
      .getInstance()
      .resetPassword(data.token, data.password);
  }

  @MessagePattern('getAllEmployees')
  async getAllEmployees() {
    return await this.getAllEmployeesUseCaseProxy
      .getInstance()
      .getAllEmployees();
  }
}
