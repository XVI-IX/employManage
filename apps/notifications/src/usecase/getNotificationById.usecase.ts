import { Logger } from '@nestjs/common';
import { INotificationRepository } from '../domain/repositories';

export class GetNotificationsById {
  private readonly logger: Logger;
  constructor(
    private readonly notificationRepository: INotificationRepository,
  ) {
    this.logger = new Logger(GetNotificationsById.name);
  }

  async getNotificationById(data: any) {
    const notification = await this.notificationRepository.find({
      where: {
        id: data.notificationId,
      },
    });

    return notification;
  }
}
