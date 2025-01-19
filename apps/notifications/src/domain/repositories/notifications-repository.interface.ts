import { IBaseRepository } from '@app/common/domain/repositories';
import { NotificationModel } from '../models';

export interface INotificationRepository
  extends IBaseRepository<NotificationModel> {
  markAsRead(notificationId: string): Promise<NotificationModel>;
  markAllAsRead(employeeId: string): Promise<NotificationModel[]>;
}
