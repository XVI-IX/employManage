import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './infrastructure/controllers/tasks.controller';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
