import { LoggerService } from '@app/common/infrastructure/logger/logger.service';
import { JwtTokenService } from '@app/common/infrastructure/services/jwt/jwt.service';
import { Module } from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employees.repository';
import { ArgonService } from '@app/common/infrastructure/services/argon/argon.service';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { RegisterEmployeeUseCase } from '../../usecase/auth/registerEmployee.usecase';
import { LoggerModule } from '@app/common/infrastructure/logger/logger.module';
import { JwtTokenModule } from '@app/common/infrastructure/services/jwt/jwt.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { ArgonModule } from '@app/common/infrastructure/services/argon/argon.module';

@Module({
  imports: [LoggerModule, JwtTokenModule, RepositoriesModule, ArgonModule],
})
export class GeneralUseCaseProxyModule {
  static REGISTER_USE_CASE_PROXY = 'REGISTER_USE_CASE_PROXY';

  static register() {
    return {
      module: GeneralUseCaseProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EmployeeRepository,
            ArgonService,
          ],
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
      ],
    };
  }
}
