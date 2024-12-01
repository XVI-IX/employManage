import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IDepartmentRepository } from '../../domain/repositories';
import { PoolConnection } from 'mysql2/promise';
import { DatabaseService } from '@app/common/infrastructure/services/database/database.service';
import { DepartmentModel } from '../../domain/models/department.model';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';
import { QueryBuilder } from '@app/common/infrastructure/services/database/database.query.builder';
import {
  IFindOneOptions,
  IFindOptions,
  IPaginateOptions,
  IPaginateResult,
} from '@app/common/domain/adapters';

@Injectable()
export class DepartmentRepository implements IDepartmentRepository {
  private logger: Logger;
  private collectionName = 'departments';
  private connection: Promise<PoolConnection>;
  constructor(private readonly databaseService: DatabaseService) {
    this.logger = new Logger(DepartmentRepository.name);
    this.connection = this.databaseService.getConnection().then();
  }

  /**
   * @name save
   * @description Saves department data
   *
   * @param entity object representing department data
   * @returns saved department model
   */
  async save(entity: Partial<DepartmentModel>): Promise<DepartmentModel> {
    const departmentId = uuid();
    const departmentDocument = {
      id: departmentId,
      name: entity.name,
      parentId: entity.parentId,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    const builder = new QueryBuilder<DepartmentModel>()
      .into(this.collectionName)
      .insert(departmentDocument)
      .build();

    try {
      const result = await this.databaseService.query(builder);

      return this.transformQueryResultToDepartmentModel(result[0]);
    } catch (error) {
      this.logger.error('Error saving department', error.stack);
      throw new BadRequestException('Error saving department');
    }
  }

  /**
   * @name findOne
   * @description Finds department by options
   *
   * @param options object of object to query database with
   * @returns retrieved department model
   */
  async findOne(
    options: IFindOneOptions<DepartmentModel>,
  ): Promise<DepartmentModel | null> {
    const builder: string = new QueryBuilder<DepartmentModel>()
      .findOne()
      .from(this.collectionName)
      .where(options.where)
      .build();

    try {
      const result = await this.databaseService.query(builder);

      return this.transformQueryResultToDepartmentModel(result[0][0]);
    } catch (error) {
      this.logger.error('Error finding department', error.stack);
      throw new BadRequestException('Error finding department');
    }
  }

  /**
   * @name find
   * @description Finds departments by options
   *
   * @param options options to query database with
   * @returns results retrieved from database
   */
  async find(
    options: IFindOptions<DepartmentModel>,
  ): Promise<DepartmentModel[]> {
    const builder: string = new QueryBuilder<DepartmentModel>()
      .findAll()
      .from(this.collectionName)
      .where(options.where)
      .build();

    try {
      const result = await this.databaseService.query(builder);

      return this.transformQueryResultsToDepartmentModels(result[0]);
    } catch (error) {
      this.logger.error('Error finding department', error.stack);
      throw new BadRequestException('Error finding department');
    }
  }

  /**
   * @name update
   * @description Updates department data
   *
   * @param id unique identifier of the department
   * @param entity object representing department data
   * @returns updated department model
   */
  async update(
    id: string,
    entity: Partial<DepartmentModel>,
  ): Promise<DepartmentModel> {
    const builder: string = new QueryBuilder<DepartmentModel>()
      .from(this.collectionName)
      .update(entity)
      .where({ id })
      .build();

    const checkDepartmentQuery: string = new QueryBuilder<DepartmentModel>()
      .findOne()
      .from(this.collectionName)
      .where({ id })
      .build();

    try {
      const checkDepartmentExists =
        await this.databaseService.query(checkDepartmentQuery);

      if (!checkDepartmentExists[0][0]) {
        throw new NotFoundException('Department not found');
      }

      await this.databaseService.query(builder);

      const getUpdatedDepartmentQuery: string =
        new QueryBuilder<DepartmentModel>()
          .findOne()
          .from(this.collectionName)
          .where({ id })
          .build();

      const updatedDepartment = await this.databaseService.query(
        getUpdatedDepartmentQuery,
      );

      return this.transformQueryResultToDepartmentModel(
        updatedDepartment[0][0],
      );
    } catch (error) {
      this.logger.error('Error updating department', error.stack);
      throw new BadRequestException('Error updating department');
    }
  }

  /**
   * @name paginate
   * @description Paginates departments
   *
   * @param options options to paginate departments
   * @param searchOptions options to search departments
   * @returns paginated results
   */
  async paginate(
    options: IPaginateOptions,
    searchOptions?: IFindOptions<DepartmentModel>,
  ): Promise<IPaginateResult<DepartmentModel>> {
    const { page, limit, sort } = options;
    const builder: string = new QueryBuilder<DepartmentModel>()
      .findAll()
      .from(this.collectionName)
      .where(searchOptions?.where)
      .orderBy(sort as keyof DepartmentModel, 'DESC')
      .limit(limit)
      .offset((page - 1) * limit)
      .build();

    try {
      const result = await this.databaseService.query(builder);

      return {
        data: this.transformQueryResultsToDepartmentModels(result[0]),
        limit,
        itemCount: result[0].length,
        itemsPerPage: limit,
        currentPage: page,
      };
    } catch (error) {
      this.logger.error('Error paginating departments', error.stack);
      throw new BadRequestException('Error paginating departments');
    }
  }

  /**
   * @name delete
   * @description Deletes department
   *
   * @param id unique identifier of the department
   * @returns deleted department id
   */
  async delete(id: string): Promise<string> {
    const builder: string = new QueryBuilder<DepartmentModel>()
      .from(this.collectionName)
      .delete()
      .where({ id })
      .build();

    try {
      const checkDepartmentQuery: string = new QueryBuilder<DepartmentModel>()
        .findOne()
        .from(this.collectionName)
        .where({ id })
        .build();

      const checkDepartmentExists =
        await this.databaseService.query(checkDepartmentQuery);

      if (!checkDepartmentExists[0][0]) {
        throw new NotFoundException('Department not found');
      }

      await this.databaseService.query(builder);

      return id;
    } catch (error) {
      this.logger.error('Error deleting department', error.stack);
      throw new BadRequestException('Error deleting department');
    }
  }

  private transformQueryResultToDepartmentModel(row: any): DepartmentModel {
    return {
      id: row.id,
      name: row.name,
      parentId: row.parentId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  private transformQueryResultsToDepartmentModels(
    rows: any[],
  ): DepartmentModel[] {
    return rows.map((r) => {
      return this.transformQueryResultToDepartmentModel(r);
    });
  }
}
