import { Injectable } from '@nestjs/common';
import { INotificationRepository } from '../../domain/repositories';
import { DatabaseService } from '@app/common/infrastructure/services/database/database.service';
import {
  IFindOptions,
  IFindOneOptions,
  IPaginateOptions,
  IPaginateResult,
} from '@app/common/domain/adapters';
import { NotificationModel } from '../../domain/models';

@Injectable()
export class NotificationsRepository implements INotificationRepository {
  constructor(private readonly databaseService: DatabaseService) {}
  markAsRead(notificationId: string): Promise<NotificationModel> {
    throw new Error('Method not implemented.');
  }
  getNotificationByEmployeeId(
    employeeId: string,
  ): Promise<NotificationModel[]> {
    throw new Error('Method not implemented.');
  }
  save?(entity: Partial<NotificationModel>): Promise<NotificationModel> {
    throw new Error('Method not implemented.');
  }
  find?(
    options: IFindOptions<NotificationModel>,
  ): Promise<NotificationModel[]> {
    throw new Error('Method not implemented.');
  }
  findOne?(
    query: IFindOneOptions<NotificationModel>,
  ): Promise<NotificationModel> {
    throw new Error('Method not implemented.');
  }
  paginate?(
    options: IPaginateOptions,
    searchOptions?: IFindOptions<NotificationModel>,
  ): Promise<IPaginateResult<NotificationModel>> {
    throw new Error('Method not implemented.');
  }
  delete?(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  update?(
    id: string,
    entity: Partial<NotificationModel>,
  ): Promise<NotificationModel> {
    throw new Error('Method not implemented.');
  }
}
