import { INotificationRepository } from '../domain/repositories';

export class GetNotificationsByEmployeeIdUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository,
  ) {}

  async getNotificationsByEmployeeId(employeeId: string) {
    try {
      const results = await this.notificationRepository.find({
        where: {
          employeeId,
        },
      });

      return results;
    } catch (error) {
      throw error;
    }
  }
}
