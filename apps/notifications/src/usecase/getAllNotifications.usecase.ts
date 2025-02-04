import { Logger } from '@nestjs/common';
import { INotificationRepository } from '../domain/repositories';

export class GetAllNotificationsUseCase {
  private readonly logger: Logger;
  constructor(
    private readonly notificationsRepository: INotificationRepository,
  ) {
    this.logger = new Logger(GetAllNotificationsUseCase.name);
  }

  async getAllNotifications() {
    const notifications = await this.notificationsRepository.find({});

    return notifications;
  }
}
