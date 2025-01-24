import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationsRepository } from './infrastructure/repositories/notifications.repository';
import { NotificationsRepositoryModule } from './infrastructure/repositories/notifications-repository.module';
import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { NotificationGeneralUseCaseProxyModule } from './infrastructure/usecase-proxy/notificationGeneralProxy.module';

@Module({
  imports: [
    NotificationsRepositoryModule,
    DatabaseModule,
    NotificationGeneralUseCaseProxyModule.register(),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
