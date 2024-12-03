import { Module } from '@nestjs/common';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { DepartmentRepositoryModule } from './infrastructure/repositories/repositories.module';
import { DepartmentGeneralUseCaseProxyModule } from './infrastructure/usecase-proxy/departmentGeneralUsecaseProxy.module';

@Module({
  imports: [
    DatabaseModule,
    DepartmentRepositoryModule,
    DepartmentGeneralUseCaseProxyModule.register(),
  ],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
