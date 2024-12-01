import { Module } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';

@Module({
  providers: [DepartmentRepository],
  exports: [DepartmentRepository],
})
export class DepartmentRepositoryModule {}
