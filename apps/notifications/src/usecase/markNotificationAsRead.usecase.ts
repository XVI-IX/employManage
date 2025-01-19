import { Logger, NotFoundException } from '@nestjs/common';
import { INotificationRepository } from '../domain/repositories';

export class MarkNotificationAsReadUseCase {
  private readonly logger: Logger;
  constructor(
    private readonly notificationRepository: INotificationRepository,
  ) {
    this.logger = new Logger(MarkNotificationAsReadUseCase.name);
  }

  async markAsRead(notificationId: string) {
    const notificationCheck = await this.notificationRepository.findOne({
      where: {
        id: notificationId,
      },
    });

    if (!notificationCheck) {
      throw new NotFoundException('Notification with ID not found');
    }

    const notification =
      await this.notificationRepository.markAsRead(notificationId);

    return notification;
  }
}
