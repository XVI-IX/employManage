import { Logger, NotFoundException } from '@nestjs/common';
import { INotificationRepository } from '../domain/repositories';

export class MarkNotificationAsReadUseCase {
  private readonly logger: Logger;
  constructor(
    private readonly notificationRepository: INotificationRepository,
  ) {
    this.logger = new Logger(MarkNotificationAsReadUseCase.name);
  }

  async markAsRead(data: any) {
    const notificationCheck = await this.notificationRepository.find({
      where: {
        id: data.notificationId,
      },
    });

    if (!notificationCheck) {
      throw new NotFoundException('Notification with ID not found');
    }

    const notification = await this.notificationRepository.markAsRead(
      data.notificationId,
    );

    return notification;
  }
}
