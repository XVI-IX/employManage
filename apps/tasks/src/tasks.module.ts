import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './infrastructure/controllers/tasks.controller';
import { TasksGeneralUsecaseProxyModule } from './infrastructure/usecase-proxy/tasksGeneral.usecase-proxy.module';
import { TaskRepositoryModule } from './infrastructure/repositories/task.repository.module';
import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { ProjectRepositoryModule } from 'apps/projects/src/infrastructure/repositories/projects.repository.module';
import { DepartmentRepositoryModule } from 'apps/departments/src/infrastructure/repositories/repositories.module';
import { RepositoriesModule } from 'apps/employees/src/infrastructure/repositories/repositories.module';

@Module({
  imports: [
    DatabaseModule,
    TaskRepositoryModule,
    ProjectRepositoryModule,
    DepartmentRepositoryModule,
    RepositoriesModule,
    TasksGeneralUsecaseProxyModule.register(),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
