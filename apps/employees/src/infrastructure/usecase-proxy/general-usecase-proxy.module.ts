import { LoggerService } from '@app/common/infrastructure/logger/logger.service';
import { JwtTokenService } from '@app/common/infrastructure/services/jwt/jwt.service';
import { DynamicModule, Module } from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employees.repository';
import { ArgonService } from '@app/common/infrastructure/services/argon/argon.service';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { RegisterEmployeeUseCase } from '../../usecase/auth/registerEmployee.usecase';
import { LoggerModule } from '@app/common/infrastructure/logger/logger.module';
import { JwtTokenModule } from '@app/common/infrastructure/services/jwt/jwt.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { ArgonModule } from '@app/common/infrastructure/services/argon/argon.module';
import { LoginUseCase } from '../../usecase/auth/loginEmployee.usecase';
import { GetAllEmployeesUseCase } from '../../usecase/account/getAllEmployees.usecase';
import { GetEmployeeUseCase } from '../../usecase/account/getEmployee.usecase';
import { UpdateEmployeeUseCase } from '../../usecase/account/updateEmployee.usecase';
import { TestEmployeeUseCase } from '../../usecase/account/testEmployee.usecase';

@Module({
  imports: [LoggerModule, JwtTokenModule, RepositoriesModule, ArgonModule],
})
export class GeneralUseCaseProxyModule {
  static REGISTER_USE_CASE_PROXY = 'REGISTER_USE_CASE_PROXY';
  static LOGIN_USE_CASE_PROXY = 'LOGIN_USE_CASE_PROXY';
  static FORGOT_PASSWORD_USE_CASE_PROXY = 'FORGOT_PASSWORD_USE_CASE_PROXY';
  static RESET_PASSWORD_USE_CASE_PROXY = 'RESET_PASSWORD_USE_CASE_PROXY';
  static GET_ALL_EMPLOYEES_USE_CASE_PROXY = 'GET_ALL_EMPLOYEES_USE_CASE_PROXY';
  static GET_EMPLOYEE_BY_ID_USE_CASE_PROXY =
    'GET_EMPLOYEE_BY_ID_USE_CASE_PROXY';
  static UPDATE_EMPLOYEE_USE_CASE_PROXY = 'UPDATE_EMPLOYEE_USE_CASE_PROXY';
  static TEST_EMPLOYEE_USE_CASE_PROXY = 'TEST_EMPLOYEE_USE_CASE_PROXY';

  static register(): DynamicModule {
    return {
      module: GeneralUseCaseProxyModule,
      providers: [
        {
          inject: [EmployeeRepository, ArgonService, JwtTokenService],
          provide: GeneralUseCaseProxyModule.REGISTER_USE_CASE_PROXY,
          useFactory: (
            jwtTokenService: JwtTokenService,
            employeeRepository: EmployeeRepository,
            argonService: ArgonService,
          ) =>
            new UseCaseProxy(
              new RegisterEmployeeUseCase(
                employeeRepository,
                argonService,
                jwtTokenService,
              ),
            ),
        },
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EmployeeRepository,
            ArgonService,
          ],
          provide: GeneralUseCaseProxyModule.LOGIN_USE_CASE_PROXY,
          useFactory: (
            employeeRepository: EmployeeRepository,
            loggerService: LoggerService,
            jwtTokenService: JwtTokenService,
            argonService: ArgonService,
          ) =>
            new UseCaseProxy(
              new LoginUseCase(
                employeeRepository,
                loggerService,
                jwtTokenService,
                argonService,
              ),
            ),
        },
        {
          inject: [EmployeeRepository],
          provide: GeneralUseCaseProxyModule.GET_ALL_EMPLOYEES_USE_CASE_PROXY,
          useFactory: (employeeRepository: EmployeeRepository) =>
            new UseCaseProxy(new GetAllEmployeesUseCase(employeeRepository)),
        },
        {
          inject: [EmployeeRepository],
          provide: GeneralUseCaseProxyModule.GET_EMPLOYEE_BY_ID_USE_CASE_PROXY,
          useFactory: (employeeRepository: EmployeeRepository) =>
            new UseCaseProxy(new GetEmployeeUseCase(employeeRepository)),
        },
        {
          inject: [EmployeeRepository],
          provide: GeneralUseCaseProxyModule.UPDATE_EMPLOYEE_USE_CASE_PROXY,
          useFactory: (employeeRepository: EmployeeRepository) =>
            new UseCaseProxy(new UpdateEmployeeUseCase(employeeRepository)),
        },
        {
          inject: [],
          provide: GeneralUseCaseProxyModule.TEST_EMPLOYEE_USE_CASE_PROXY,
          useFactory: () => new UseCaseProxy(new TestEmployeeUseCase()),
        },
      ],
      exports: [
        GeneralUseCaseProxyModule.REGISTER_USE_CASE_PROXY,
        GeneralUseCaseProxyModule.LOGIN_USE_CASE_PROXY,
        GeneralUseCaseProxyModule.GET_ALL_EMPLOYEES_USE_CASE_PROXY,
        GeneralUseCaseProxyModule.GET_EMPLOYEE_BY_ID_USE_CASE_PROXY,
        GeneralUseCaseProxyModule.UPDATE_EMPLOYEE_USE_CASE_PROXY,
        // GeneralUseCaseProxyModule.FORGOT_PASSWORD_USE_CASE_PROXY,
        // GeneralUseCaseProxyModule.RESET_PASSWORD_USE_CASE_PROXY,
        GeneralUseCaseProxyModule.TEST_EMPLOYEE_USE_CASE_PROXY,
      ],
    };
  }
}
