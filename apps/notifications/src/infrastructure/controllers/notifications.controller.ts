import { Controller, Inject } from '@nestjs/common';
import { NotificationGeneralUseCaseProxyModule } from '../usecase-proxy/notificationGeneralProxy.module';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { CreateNotificationUseCase } from '../../usecase/createNotification.usecase';
import { DeleteNotificationUseCase } from '../../usecase/deleteNotification.usecase';
import { GetAllNotificationsUseCase } from '../../usecase/getAllNotifications.usecase';
import { GetNotificationsById } from '../../usecase/getNotificationById.usecase';
import { MarkAllNotificationsAsReadUseCase } from '../../usecase/markAllNotificationsRead.usecase';
import { MarkNotificationAsReadUseCase } from '../../usecase/markNotificationAsRead.usecase';
import { GetNotificationsByEmployeeIdUseCase } from '../../usecase/getNotificationsByEmployeeId.usecase';
import { UpdateNotificationUseCase } from '../../usecase/updateNotification.usecase';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateNotificationInput,
  UpdateNotificationInput,
} from '../common/schemas/notifications.schema';
import { HttpResponse } from '@app/common/infrastructure/helpers/response.helper';
import { SseService } from '@app/common/infrastructure/services/sse/sse.service';

@Controller()
export class NotificationsController {
  constructor(
    private readonly sseService: SseService,
    @Inject(
      NotificationGeneralUseCaseProxyModule.CREATE_NOTIFICATION_USE_CASE_PROXY,
    )
    private readonly createNotificationUseCaseProxy: UseCaseProxy<CreateNotificationUseCase>,
    @Inject(
      NotificationGeneralUseCaseProxyModule.DELETE_NOTIFICATION_USE_CASE_PROXY,
    )
    private readonly deleteNotificationUseCaseProxy: UseCaseProxy<DeleteNotificationUseCase>,
    @Inject(
      NotificationGeneralUseCaseProxyModule.GET_ALL_NOTIFICATIONS_USE_CASE_PROXY,
    )
    private readonly getAllNotificationsUseCaseProxy: UseCaseProxy<GetAllNotificationsUseCase>,
    @Inject(
      NotificationGeneralUseCaseProxyModule.GET_NOTIFICATION_BY_ID_USE_CASE_PROXY,
    )
    private readonly getNotificationByIdUseCaseProxy: UseCaseProxy<GetNotificationsById>,
    @Inject(
      NotificationGeneralUseCaseProxyModule.MARK_ALL_NOTIFICATIONS_AS_READ_USE_CASE_PROXY,
    )
    private readonly markAllNotificationsAsReadUseCaseProxy: UseCaseProxy<MarkAllNotificationsAsReadUseCase>,
    @Inject(
      NotificationGeneralUseCaseProxyModule.MARK_NOTIFICATION_AS_READ_USE_CASE_PROXY,
    )
    private readonly markNotificationAsReadUseCaseProxy: UseCaseProxy<MarkNotificationAsReadUseCase>,
    @Inject(
      NotificationGeneralUseCaseProxyModule.GET_NOTIFICATIONS_BY_EMPLOYEE_ID_USE_CASE_PROXY,
    )
    private readonly getNotificationsByEmployeeIdUseCaseProxy: UseCaseProxy<GetNotificationsByEmployeeIdUseCase>,
    @Inject(
      NotificationGeneralUseCaseProxyModule.UPDATE_NOTIFICATION_USE_CASE_PROXY,
    )
    private readonly updateNotificationUseCaseProxy: UseCaseProxy<UpdateNotificationUseCase>,
  ) {}

  @MessagePattern('createNotification')
  async createNotification(data: CreateNotificationInput) {
    const response = await this.createNotificationUseCaseProxy
      .getInstance()
      .createNotification(data);

    await this.sseService.sendNotification(data.employeeId, response[0]);

    return HttpResponse.send('Notification created successfully', response);
  }

  @MessagePattern('deleteNotification')
  async deleteNotification(notificationId: string) {
    const response = await this.deleteNotificationUseCaseProxy
      .getInstance()
      .deleteNotification(notificationId);

    return HttpResponse.send('Notification deleted successfully', response);
  }

  @MessagePattern('getAllNotifications')
  async getAllNotifications() {
    const response = await this.getAllNotificationsUseCaseProxy
      .getInstance()
      .getAllNotifications();

    return HttpResponse.send('Notifications retrieved successfully', response);
  }

  @MessagePattern('getNotificationById')
  async getNotificationById(notificationId: string) {
    const response = await this.getNotificationByIdUseCaseProxy
      .getInstance()
      .getNotificationById(notificationId);

    return HttpResponse.send('Notification retrieved successfully', response);
  }

  @MessagePattern('markAllNotificationsAsRead')
  async markAllNotifcationsAsRead(employeeId: string) {
    const response = await this.markNotificationAsReadUseCaseProxy
      .getInstance()
      .markAsRead(employeeId);

    return HttpResponse.send(
      'Notifications marked as read successfully',
      response,
    );
  }

  @MessagePattern('markNotificationAsRead')
  async markNotificationAsRead(notificationId: string) {
    const response = await this.markNotificationAsReadUseCaseProxy
      .getInstance()
      .markAsRead(notificationId);

    return HttpResponse.send(
      'Notification marked as read successfully',
      response,
    );
  }

  @MessagePattern('getNotificationsByEmployeeId')
  async getNotificationsByEmployeeId(employeeId: string) {
    const response = await this.getNotificationsByEmployeeIdUseCaseProxy
      .getInstance()
      .getNotificationsByEmployeeId(employeeId);

    return HttpResponse.send('Notifications retrieved successfully', response);
  }

  @MessagePattern('updateNotification')
  async updateNotification(data: UpdateNotificationInput) {
    const response = await this.updateNotificationUseCaseProxy
      .getInstance()
      .updateNotification(data.notificationId, data);

    this.sseService.sendNotification(response.employeeId, response);

    return HttpResponse.send('Notification updated successfully', response);
  }
}
