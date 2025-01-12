import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { Module } from '@nestjs/common';
import { TaskRepository } from './tasks.repository';

@Module({
  imports: [DatabaseModule],
  providers: [TaskRepository],
  exports: [TaskRepository],
})
export class TaskRepositoryModule {}
