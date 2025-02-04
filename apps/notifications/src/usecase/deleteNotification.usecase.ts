import { Logger } from '@nestjs/common';
import { INotificationRepository } from '../domain/repositories';

export class DeleteNotificationUseCase {
  private readonly logger: Logger;
  constructor(
    private readonly notificationRepository: INotificationRepository,
  ) {
    this.logger = new Logger(DeleteNotificationUseCase.name);
  }

  async deleteNotification(notificationId: string) {
    try {
      const notification =
        await this.notificationRepository.delete(notificationId);

      return notification;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}
