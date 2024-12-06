import { Module } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [DepartmentRepository],
  exports: [DepartmentRepository],
})
export class DepartmentRepositoryModule {}
