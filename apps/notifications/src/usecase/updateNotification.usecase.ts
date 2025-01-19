import { Logger, NotFoundException } from '@nestjs/common';
import { INotificationRepository } from '../domain/repositories';
import { UpdateNotificationInput } from '../infrastructure/common/schemas/notifications.schema';

export class UpdateNotificationUseCase {
  private readonly logger: Logger;
  constructor(
    private readonly notificationRepository: INotificationRepository,
  ) {
    this.logger = new Logger(UpdateNotificationUseCase.name);
  }

  async updateNotification(
    notificationId: string,
    data: UpdateNotificationInput,
  ) {
    try {
      const checkNotification = await this.notificationRepository.findOne({
        where: {
          id: notificationId,
        },
      });

      if (!checkNotification) {
        throw new NotFoundException('Notification with ID specified not found');
      }

      const notification = await this.notificationRepository.update(
        notificationId,
        data,
      );

      return notification;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
