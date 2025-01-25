import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNotificationInput } from 'apps/notifications/src/infrastructure/common/schemas/notifications.schema';

@Controller('/api/v1/notifications')
export class NotificationGatewayController {
  constructor(
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationService: ClientProxy,
  ) {}

  @Post('/')
  async createNotification(@Body() data: CreateNotificationInput) {
    return this.notificationService.send('createNotification', data);
  }

  @Get('/')
  async getAllNotifications() {
    return this.notificationService.send('getAllNotifications', {});
  }

  @Get('/employees/:employeeId')
  async getNotificationsByEmployeeId(@Param('employeeId') employeeId: string) {
    return this.notificationService.send('getNotificationsByEmployeeId', {
      employeeId,
    });
  }

  @Get('/:notificationId')
  async getNotficationById(@Param('notificationId') notificationId: string) {
    return this.notificationService.send('getNotificationById', {
      notificationId,
    });
  }

  @Get('/mark-all-as-read/:employeeId')
  async markAllNotificationsAsRead(@Param('employeeId') employeeId: string) {
    return this.notificationService.send('markAllNotificationsAsRead', {
      employeeId,
    });
  }

  @Delete('/:notificationId')
  async deleteNotification(@Param('notificationId') notificationId: string) {
    return this.notificationService.send('deleteNotification', {
      notificationId,
    });
  }
}
