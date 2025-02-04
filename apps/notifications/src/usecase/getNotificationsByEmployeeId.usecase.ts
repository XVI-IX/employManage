import { INotificationRepository } from '../domain/repositories';

export class GetNotificationsByEmployeeIdUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository,
  ) {}

  async getNotificationsByEmployeeId(data: any) {
    try {
      const results = await this.notificationRepository.find({
        where: {
          employeeId: data.employeeId,
        },
      });

      return results;
    } catch (error) {
      throw error;
    }
  }
}
