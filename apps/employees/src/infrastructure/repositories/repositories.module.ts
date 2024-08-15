import { Module } from '@nestjs/common';
import { EmployeeRepository } from './employees.repository';
import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [EmployeeRepository],
  exports: [EmployeeRepository],
})
export class RepositoriesModule {}
