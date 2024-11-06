import { LoggerService } from '@app/common/infrastructure/logger/logger.service';
import { JwtTokenService } from '@app/common/infrastructure/services/jwt/jwt.service';
import { Module } from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employees.repository';
import { ArgonService } from '@app/common/infrastructure/services/argon/argon.service';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';

@Module({
  imports: [],
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
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            employeeRepository: EmployeeRepository,
            argonService: ArgonService,
          ) => new UseCaseProxy(
            new 
          )
        },
      ],
    };
  }
}
