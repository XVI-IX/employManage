import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { INotificationRepository } from '../../domain/repositories';
import { DatabaseService } from '@app/common/infrastructure/services/database/database.service';
import {
  IFindOptions,
  IFindOneOptions,
  IPaginateOptions,
  IPaginateResult,
} from '@app/common/domain/adapters';
import { NotificationModel } from '../../domain/models';
import { QueryBuilder } from '@app/common/infrastructure/services/database/database.query.builder';

@Injectable()
export class NotificationsRepository implements INotificationRepository {
  private readonly collectionName: string;
  private readonly logger: Logger;

  constructor(private readonly databaseService: DatabaseService) {
    this.logger = new Logger(NotificationsRepository.name);
    this.collectionName = 'Notifications';
  }

  async markAllAsRead(employeeId: string): Promise<NotificationModel[]> {
    const builder: string = new QueryBuilder<NotificationModel>()
      .from(this.collectionName)
      .update({
        isRead: true,
      })
      .where({
        employeeId,
      })
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException(
          'Notifications could not be marked as read',
        );
      }

      return this.transformQueryResultToNotificationModelArray(result);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async markAsRead(notificationId: string): Promise<NotificationModel> {
    const builder: string = new QueryBuilder<NotificationModel>()
      .from(this.collectionName)
      .update({
        isRead: true,
      })
      .where({
        id: notificationId,
      })
      .build();
    try {
      const results = await this.databaseService.query(builder);

      if (!results) {
        throw new BadRequestException(
          'Notification could not be marked as read',
        );
      }

      return this.transformQueryResultToNotificationModel(results[0]);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  // async getNotificationByEmployeeId(
  //   employeeId: string,
  // ): Promise<NotificationModel[]> {
  //   throw new Error('Method not implemented.');
  // }

  async save?(entity: Partial<NotificationModel>): Promise<NotificationModel> {
    const builder: string = new QueryBuilder<NotificationModel>()
      .into(this.collectionName)
      .insert(entity)
      .build();
    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Notification could not be saved');
      }

      return this.transformQueryResultToNotificationModel(result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async find?(
    options: IFindOptions<NotificationModel>,
  ): Promise<NotificationModel[]> {
    const builder: string = new QueryBuilder<NotificationModel>()
      .select([])
      .from(this.collectionName)
      .where(options.where)
      .orderBy(options.orderBy as keyof NotificationModel)
      .offset(options.skip)
      .limit(options.take)
      .build();
    try {
      const results = await this.databaseService.query(builder);

      if (!results) {
        throw new BadRequestException('Notifications could not be retrieved');
      }

      return this.transformQueryResultToNotificationModelArray(results);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findOne?(
    query: IFindOneOptions<NotificationModel>,
  ): Promise<NotificationModel> {
    const builder: string = new QueryBuilder<NotificationModel>()
      .select([])
      .from(this.collectionName)
      .where(query.where)
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Notification could not be retrieved');
      }

      return this.transformQueryResultToNotificationModel(result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  paginate?(
    options: IPaginateOptions,
    searchOptions?: IFindOptions<NotificationModel>,
  ): Promise<IPaginateResult<NotificationModel>> {
    throw new Error('Method not implemented.');
  }

  async delete?(id: string): Promise<string> {
    const builder: string = new QueryBuilder<NotificationModel>()
      .from(this.collectionName)
      .delete()
      .where({
        id,
      })
      .build();
    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Notification could not be deleted');
      }

      return 'result';
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async update?(
    id: string,
    entity: Partial<NotificationModel>,
  ): Promise<NotificationModel> {
    const builder: string = new QueryBuilder<NotificationModel>()
      .from(this.collectionName)
      .update({
        title: entity.title,
        content: entity.content,
      })
      .where({
        id,
      })
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Notification could not be updated');
      }

      return this.transformQueryResultToNotificationModel(result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  private transformQueryResultToNotificationModel(row: any): NotificationModel {
    return {
      id: row.id,
      title: row.title,
      content: row.content,
      isRead: row.isRead,
      employeeId: row.employeeId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  private transformQueryResultToNotificationModelArray(
    rows: any[],
  ): NotificationModel[] {
    return rows.map((row) => {
      return this.transformQueryResultToNotificationModel(row);
    });
  }
}
