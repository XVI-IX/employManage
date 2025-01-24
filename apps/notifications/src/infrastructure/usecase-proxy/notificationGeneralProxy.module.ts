import { DynamicModule, Module } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { NotificationsRepositoryModule } from '../repositories/notifications-repository.module';
import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { CreateNotificationUseCase } from '../../usecase/createNotification.usecase';
import { DeleteNotificationUseCase } from '../../usecase/deleteNotification.usecase';
import { GetAllNotificationsUseCase } from '../../usecase/getAllNotifications.usecase';
import { GetNotificationsById } from '../../usecase/getNotificationById.usecase';
import { MarkAllNotificationsAsReadUseCase } from '../../usecase/markAllNotificationsRead.usecase';
import { MarkNotificationAsReadUseCase } from '../../usecase/markNotificationAsRead.usecase';
import { UpdateNotificationUseCase } from '../../usecase/updateNotification.usecase';
import { GetNotificationsByEmployeeIdUseCase } from '../../usecase/getNotificationsByEmployeeId.usecase';

@Module({
  imports: [NotificationsRepositoryModule, DatabaseModule],
})
export class NotificationGeneralUseCaseProxyModule {
  static CREATE_NOTIFICATION_USE_CASE_PROXY =
    'CREATE_NOTIFICATION_USE_CASE_PROXY';
  static DELETE_NOTIFICATION_USE_CASE_PROXY =
    'DELETE_NOTIFICATION_USE_CASE_PROXY';
  static GET_ALL_NOTIFICATIONS_USE_CASE_PROXY =
    'GET_ALL_NOTIFICATIONS_USE_CASE_PROXY';
  static GET_NOTIFICATION_BY_ID_USE_CASE_PROXY =
    'GET_NOTIFICATION_BY_ID_USE_CASE_PROXY';
  static MARK_ALL_NOTIFICATIONS_AS_READ_USE_CASE_PROXY =
    'MARK_ALL_NOTIFICATIONS_AS_READ_USE_CASE_PROXY';
  static MARK_NOTIFICATION_AS_READ_USE_CASE_PROXY =
    'MARK_NOTIFICATION_AS_READ_USE_CASE_PROXY';
  static UPDATE_NOTIFICATION_USE_CASE_PROXY =
    'UPDATE_NOTIFICATION_USE_CASE_PROXY';
  static GET_NOTIFICATIONS_BY_EMPLOYEE_ID_USE_CASE_PROXY =
    'GET_NOTIFICATIONS_BY_EMPLOYEE_ID_USE_CASE_PROXY';

  static register(): DynamicModule {
    return {
      module: NotificationGeneralUseCaseProxyModule,
      providers: [
        {
          inject: [NotificationsRepository],
          provide:
            NotificationGeneralUseCaseProxyModule.CREATE_NOTIFICATION_USE_CASE_PROXY,
          useFactory: (notificationRepository: NotificationsRepository) =>
            new UseCaseProxy(
              new CreateNotificationUseCase(notificationRepository),
            ),
        },
        {
          inject: [NotificationsRepository],
          provide:
            NotificationGeneralUseCaseProxyModule.DELETE_NOTIFICATION_USE_CASE_PROXY,
          useFactory: (notificationRepository: NotificationsRepository) =>
            new UseCaseProxy(
              new DeleteNotificationUseCase(notificationRepository),
            ),
        },
        {
          inject: [NotificationsRepository],
          provide:
            NotificationGeneralUseCaseProxyModule.GET_ALL_NOTIFICATIONS_USE_CASE_PROXY,
          useFactory: (notificationRepository: NotificationsRepository) =>
            new UseCaseProxy(
              new GetAllNotificationsUseCase(notificationRepository),
            ),
        },
        {
          inject: [NotificationsRepository],
          provide:
            NotificationGeneralUseCaseProxyModule.GET_NOTIFICATION_BY_ID_USE_CASE_PROXY,
          useFactory: (notificationRepository: NotificationsRepository) =>
            new UseCaseProxy(new GetNotificationsById(notificationRepository)),
        },
        {
          inject: [NotificationsRepository],
          provide:
            NotificationGeneralUseCaseProxyModule.MARK_ALL_NOTIFICATIONS_AS_READ_USE_CASE_PROXY,
          useFactory: (notificationRepository: NotificationsRepository) =>
            new UseCaseProxy(
              new MarkAllNotificationsAsReadUseCase(notificationRepository),
            ),
        },
        {
          inject: [NotificationsRepository],
          provide:
            NotificationGeneralUseCaseProxyModule.MARK_NOTIFICATION_AS_READ_USE_CASE_PROXY,
          useFactory: (notificationRepository: NotificationsRepository) =>
            new UseCaseProxy(
              new MarkNotificationAsReadUseCase(notificationRepository),
            ),
        },
        {
          inject: [NotificationsRepository],
          provide:
            NotificationGeneralUseCaseProxyModule.UPDATE_NOTIFICATION_USE_CASE_PROXY,
          useFactory: (notificationRepository: NotificationsRepository) =>
            new UseCaseProxy(
              new UpdateNotificationUseCase(notificationRepository),
            ),
        },
        {
          inject: [NotificationsRepository],
          provide:
            NotificationGeneralUseCaseProxyModule.GET_NOTIFICATIONS_BY_EMPLOYEE_ID_USE_CASE_PROXY,
          useFactory: (notificationRepository: NotificationsRepository) =>
            new UseCaseProxy(
              new GetNotificationsByEmployeeIdUseCase(notificationRepository),
            ),
        },
      ],
      exports: [
        NotificationGeneralUseCaseProxyModule.CREATE_NOTIFICATION_USE_CASE_PROXY,
        NotificationGeneralUseCaseProxyModule.DELETE_NOTIFICATION_USE_CASE_PROXY,
        NotificationGeneralUseCaseProxyModule.GET_ALL_NOTIFICATIONS_USE_CASE_PROXY,
        NotificationGeneralUseCaseProxyModule.GET_NOTIFICATION_BY_ID_USE_CASE_PROXY,
        NotificationGeneralUseCaseProxyModule.MARK_ALL_NOTIFICATIONS_AS_READ_USE_CASE_PROXY,
        NotificationGeneralUseCaseProxyModule.MARK_NOTIFICATION_AS_READ_USE_CASE_PROXY,
        NotificationGeneralUseCaseProxyModule.UPDATE_NOTIFICATION_USE_CASE_PROXY,
        NotificationGeneralUseCaseProxyModule.GET_NOTIFICATIONS_BY_EMPLOYEE_ID_USE_CASE_PROXY,
      ],
    };
  }
}
