import { Logger } from '@nestjs/common';
import { INotificationRepository } from '../domain/repositories';

export class GetNotificationsById {
  private readonly logger: Logger;
  constructor(
    private readonly notificationRepository: INotificationRepository,
  ) {
    this.logger = new Logger(GetNotificationsById.name);
  }

  async getNotificationById(notificationId: string) {
    const notification = await this.notificationRepository.findOne({
      where: {
        id: notificationId,
      },
    });

    return notification;
  }
}
