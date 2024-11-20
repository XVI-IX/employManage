import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginEmployeePasswordInput } from '../common/schemas/auth.schema';
import { GeneralUseCaseProxyModule } from '../usecase-proxy/general-usecase-proxy.module';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { LoginUseCase } from '../../usecase/auth/loginEmployee.usecase';
import { TestEmployeeUseCase } from '../../usecase/account/testEmployee.usecase';

@Controller()
export class EmployeesController {
  constructor(
    @Inject(GeneralUseCaseProxyModule.LOGIN_USE_CASE_PROXY)
    private readonly loginUseCaseProxy: UseCaseProxy<LoginUseCase>,
    @Inject(GeneralUseCaseProxyModule.TEST_EMPLOYEE_USE_CASE_PROXY)
    private readonly testEmployeeUseCaseProxy: UseCaseProxy<TestEmployeeUseCase>,
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
}
