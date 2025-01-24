import { INotificationRepository } from '../domain/repositories';

export class MarkAllNotificationsAsReadUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository,
  ) {}

  async markAllNotificationsAsRead(employeeId: string) {
    try {
      const result =
        await this.notificationRepository.markAllAsRead(employeeId);

      return result;
    } catch (error) {
      throw error;
    }
  }
}
