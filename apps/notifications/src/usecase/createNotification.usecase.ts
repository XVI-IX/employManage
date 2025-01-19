import { Logger } from '@nestjs/common';
import { INotificationRepository } from '../domain/repositories';
import { CreateNotificationInput } from '../infrastructure/common/schemas/notifications.schema';

export class CreateNotificationUseCase {
  private readonly logger: Logger;

  constructor(
    private readonly notificationRepository: INotificationRepository,
  ) {
    this.logger = new Logger(CreateNotificationUseCase.name);
  }

  async createNotification(data: CreateNotificationInput) {
    try {
      const notification = await this.notificationRepository.save(data);

      // TODO: Send alert to user with notification if logged in

      return notification;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}
