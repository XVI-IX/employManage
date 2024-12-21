import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { Module } from '@nestjs/common';
import { ProjectRepository } from './projects.repository';

@Module({
  imports: [DatabaseModule],
  providers: [ProjectRepository],
  exports: [ProjectRepository],
})
export class ProjectRepositoryModule {}
