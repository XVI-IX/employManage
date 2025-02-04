import { BadRequestException, Logger } from '@nestjs/common';
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

      if (!notification) {
        throw new BadRequestException('Notification could not be saved');
      }

      const newNotification = await this.notificationRepository.find({
        where: {
          employeeId: data.employeeId,
        },
        take: 1,
        orderBy: 'createdAt',
      });

      return newNotification;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}
