import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';

@Module({
  imports: [DatabaseModule],
  exports: [NotificationsRepository],
  providers: [NotificationsRepository],
})
export class NotificationsRepositoryModule {}
