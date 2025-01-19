export class NotificationModel {
  id: string;
  title: string;
  content: string;
  employeeId: string;
  isRead: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
