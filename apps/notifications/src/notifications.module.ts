import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsRepositoryModule } from './infrastructure/repositories/notifications-repository.module';
import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { NotificationGeneralUseCaseProxyModule } from './infrastructure/usecase-proxy/notificationGeneralProxy.module';
import { SseModule } from '@app/common/infrastructure/services/sse/sse.module';
import { NotificationsController } from './infrastructure/controllers/notifications.controller';

@Module({
  imports: [
    NotificationsRepositoryModule,
    DatabaseModule,
    NotificationGeneralUseCaseProxyModule.register(),
    SseModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
