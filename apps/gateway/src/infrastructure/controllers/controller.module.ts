import { Module } from '@nestjs/common';
import { AuthEmployeeController } from './employees/auth/authEmployee.controller';
import { GeneralUseCaseProxyModule } from 'apps/employees/src/infrastructure/usecase-proxy/general-usecase-proxy.module';

@Module({
  imports: [GeneralUseCaseProxyModule.register()],
  exports: [],
  controllers: [AuthEmployeeController],
})
export class ControllerModule {}
