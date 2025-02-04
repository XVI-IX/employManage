import { envConfig } from '@app/common/infrastructure/config/environment.config';
import { LoggerModule } from '@app/common/infrastructure/logger/logger.module';
import { ArgonModule } from '@app/common/infrastructure/services/argon/argon.module';
import { JwtTokenModule } from '@app/common/infrastructure/services/jwt/jwt.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GeneralUseCaseProxyModule } from './infrastructure/usecase-proxy/general-usecase-proxy.module';
import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { EmployeesController } from './infrastructure/controllers/employees.controller';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { SseModule } from '@app/common/infrastructure/services/sse/sse.module';

@Module({
  imports: [
    JwtModule.register({
      secret: envConfig.getJWTSecret(),
    }),
    LoggerModule,
    ArgonModule,
    JwtTokenModule,
    DatabaseModule,
    RepositoriesModule,
    GeneralUseCaseProxyModule.register(),
    SseModule,
  ],
  controllers: [EmployeesController],
  providers: [],
})
export class AppModule {}
