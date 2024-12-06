import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { DepartmentRepositoryModule } from './infrastructure/repositories/repositories.module';
import { DepartmentGeneralUseCaseProxyModule } from './infrastructure/usecase-proxy/departmentGeneralUsecaseProxy.module';
import { DepartmentController } from './infrastructure/controllers/departments.controller';

@Module({
  imports: [
    DatabaseModule,
    DepartmentRepositoryModule,
    DepartmentGeneralUseCaseProxyModule.register(),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
