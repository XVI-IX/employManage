import { DatabaseService } from '@app/common/infrastructure/services/database/database.service';
import { ITaskRepository } from '../../domain/repositories/tasks.repository';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  IFindOptions,
  IFindOneOptions,
  IPaginateOptions,
  IPaginateResult,
} from '@app/common/domain/adapters';
import { TasksModel } from '../../domain/models/tasks.model';
import { QueryBuilder } from '@app/common/infrastructure/services/database/database.query.builder';

@Injectable()
export class TaskRepository implements ITaskRepository {
  private readonly collectionName: string;
  private readonly logger: Logger;

  constructor(private readonly databaseService: DatabaseService) {
    this.collectionName = 'tasks';
    this.logger = new Logger(TaskRepository.name);
  }

  findTasksByProjectIdAndEmployeeIdAndStatusAndDateRangeAndName(
    projectId: string,
    employeeId: string,
    status: string,
    startDate: Date,
    endDate: Date,
    name: string,
  ): Promise<TasksModel[]> {
    throw new Error('Method not implemented.');
  }

  async findTasksByProjectId(projectId: string): Promise<TasksModel[]> {
    const builder: string = new QueryBuilder<TasksModel>()
      .select([])
      .from(this.collectionName)
      .where({
        projectId,
      })
      .build();
    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException(
          'Tasks for this projects could not be retrieved',
        );
      }

      return this.transformQueryResultToTaskModelArray(result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findTasksByEmployeeId(employeeId: string): Promise<TasksModel[]> {
    const builder: string = new QueryBuilder<TasksModel>()
      .select([])
      .from(this.collectionName)
      .where({
        employeeId,
      })
      .build();
    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException(
          'Tasks for this employee could not be retrieved',
        );
      }

      return this.transformQueryResultToTaskModelArray(result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findTasksByProjectIdAndEmployeeId(
    projectId: string,
    employeeId: string,
  ): Promise<TasksModel[]> {
    const builder: string = new QueryBuilder<TasksModel>()
      .select([])
      .from(this.collectionName)
      .where({
        projectId,
        employeeId,
      })
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Tasks could not be retrieved');
      }

      return this.transformQueryResultToTaskModelArray(result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findTasksByStatus(status: string): Promise<TasksModel[]> {
    const builder: string = new QueryBuilder<TasksModel>()
      .select([])
      .from(this.collectionName)
      .where({
        status,
      })
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException(
          'Taks with this status could not be retrieved',
        );
      }

      return this.transformQueryResultToTaskModelArray(result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findTasksByProjectIdAndStatus(
    projectId: string,
    status: string,
  ): Promise<TasksModel[]> {
    const builder: string = new QueryBuilder<TasksModel>()
      .select([])
      .from(this.collectionName)
      .where({
        projectId,
        status,
      })
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Tasks could not be retrieved.');
      }

      return this.transformQueryResultToTaskModelArray(result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findTasksByEmployeeIdAndStatus(
    employeeId: string,
    status: string,
  ): Promise<TasksModel[]> {
    const builder: string = new QueryBuilder<TasksModel>()
      .select([])
      .from(this.collectionName)
      .where({
        employeeId,
        status,
      })
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Tasks could not be retrieved');
      }

      return this.transformQueryResultToTaskModelArray(result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findTasksByProjectIdAndEmployeeIdAndStatus(
    projectId: string,
    employeeId: string,
    status: string,
  ): Promise<TasksModel[]> {
    const builder: string = new QueryBuilder<TasksModel>()
      .select([])
      .from(this.collectionName)
      .where({
        projectId,
        employeeId,
        status,
      })
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Tasks could not be retrieved');
      }

      return this.transformQueryResultToTaskModelArray(result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findTasksByProjectIdAndEmployeeIdAndStatusAndDate(
    projectId: string,
    employeeId: string,
    status: string,
    date: Date,
  ): Promise<TasksModel[]> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findTasksByProjectIdAndEmployeeIdAndStatusAndDateRange(
    projectId: string,
    employeeId: string,
    status: string,
    startDate: Date,
    endDate: Date,
  ): Promise<TasksModel[]> {
    const builder: string = new QueryBuilder<TasksModel>()
      .select([])
      .from(this.collectionName)
      .where({
        projectId,
        employeeId,
        status,
        startDate,
        endDate,
      })
      .build();
    try {
      const results = await this.databaseService.query(builder);

      if (!results) {
        throw new BadRequestException('Tasks could not be retrieved');
      }

      return this.transformQueryResultToTaskModelArray(results);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  // TODO: Check this out later
  // async findTasksByProjectIdAndEmployeeIdAndStatusAndDateRangeAndName(
  //   projectId: string,
  //   employeeId: string,
  //   status: string,
  //   startDate: Date,
  //   endDate: Date,
  //   name: string,
  // ): Promise<TasksModel[]> {
  //   const builder: string = new QueryBuilder<TasksModel>()
  //     .select([])
  //     .from(this.collectionName)
  //     .where({
  //       projectId,
  //       employeeId,
  //       status,
  //       startDate,
  //       endDate,
  //       name,
  //     })
  //     .build();
  //   try {
  //   } catch (error) {
  //     this.logger.error(error.message, error.stack);
  //     throw error;
  //   }
  // }

  // TODO: Check this out later
  // async findTasksByProjectIdAndEmployeeIdAndStatusAndDateRangeAndNameAndDescription(
  //   projectId: string,
  //   employeeId: string,
  //   status: string,
  //   startDate: Date,
  //   endDate: Date,
  //   name: string,
  //   description: string,
  // ): Promise<TasksModel[]> {
  //   throw new Error('Method not implemented.');
  // }

  async save?(entity: Partial<TasksModel>): Promise<TasksModel> {
    const builder: string = new QueryBuilder<TasksModel>()
      .into(this.collectionName)
      .insert(entity)
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Task could not be saved');
      }

      return;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async find?(options: IFindOptions<TasksModel>): Promise<TasksModel[]> {
    const builder: string = new QueryBuilder<TasksModel>()
      .select([])
      .from(this.collectionName)
      .where(options.where)
      .orderBy(options.orderBy as keyof TasksModel)
      .limit(options.take)
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Tasks could not be retrieved');
      }

      return this.transformQueryResultToTaskModelArray(result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findOne?(query: IFindOneOptions<TasksModel>): Promise<TasksModel> {
    const builder: string = new QueryBuilder<TasksModel>()
      .select([])
      .from(this.collectionName)
      .where(query.where)
      .limit(1)
      .build();

    try {
      const result = await this.databaseService.query(builder);

      console.log('result: ', result);

      if (!result) {
        throw new BadRequestException('Task could not be retrieved');
      }

      if (result.length === 0) {
        return null;
      }

      return this.transformQueryResultToTaskModel(result[0]);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
  paginate?(
    options: IPaginateOptions,
    searchOptions?: IFindOptions<TasksModel>,
  ): Promise<IPaginateResult<TasksModel>> {
    throw new Error('Method not implemented.');
  }

  async delete?(id: string): Promise<string> {
    const builder: string = new QueryBuilder<TasksModel>()
      .from(this.collectionName)
      .delete()
      .where({
        id,
      })
      .build();
    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Task could not be deleted');
      }

      return result;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async update?(id: string, entity: Partial<TasksModel>): Promise<TasksModel> {
    const builder: string = new QueryBuilder<TasksModel>()
      .from(this.collectionName)
      .update(entity)
      .where({
        id,
      })
      .build();
    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Task could not be updated');
      }

      return;
    } catch (error) {}
  }

  private transformQueryResultToTaskModel(row: any): TasksModel {
    console.log('row: ', row);
    return {
      id: row.id,
      projectId: row.projectId,
      employeeId: row.employeeId,
      name: row.name,
      description: row.description,
      startDate: row.startDate,
      endDate: row.endDate,
      status: row.status,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  private transformQueryResultToTaskModelArray(rows: any[]): TasksModel[] {
    return rows.map((row) => {
      return this.transformQueryResultToTaskModel(row);
    });
  }
}
