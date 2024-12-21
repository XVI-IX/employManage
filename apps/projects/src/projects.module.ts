import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsGeneralUseCaseProxy } from './infrastructure/usecase-proxy/projectsGeneralUseCase.proxy';
import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { ProjectRepositoryModule } from './infrastructure/repositories/projects.repository.module';
import { RepositoriesModule } from 'apps/employees/src/infrastructure/repositories/repositories.module';
import { DepartmentRepositoryModule } from 'apps/departments/src/infrastructure/repositories/repositories.module';

@Module({
  imports: [
    DatabaseModule,
    ProjectRepositoryModule,
    RepositoriesModule,
    DepartmentRepositoryModule,
    ProjectsGeneralUseCaseProxy.register(),
  ],
  controllers: [],
  providers: [ProjectsService],
})
export class ProjectsModule {}
