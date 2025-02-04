import { INotificationRepository } from '../domain/repositories';

export class MarkAllNotificationsAsReadUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository,
  ) {}

  async markAllNotificationsAsRead(data: any) {
    try {
      const result = await this.notificationRepository.markAllAsRead(
        data.employeeId,
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
}
