import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories';
import { DatabaseService } from '@app/common/infrastructure/services/database/database.service';
import { EmployeeModel } from '../../domain/model';
import { ILike } from '@app/common/infrastructure/services/database';
import { QueryBuilder } from '@app/common/infrastructure/services/database/database.query.builder';
import {
  IFindOneOptions,
  IFindOptions,
  IPaginateOptions,
  IPaginateResult,
} from '@app/common/domain/adapters';
import { v4 as uuidv4 } from 'uuid';
import { PoolConnection } from 'mysql2/promise';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  private logger: Logger;
  private collectionName = 'employees';
  private connection: Promise<PoolConnection>;
  constructor(private readonly databaseService: DatabaseService) {
    this.logger = new Logger(EmployeeRepository.name);
    this.connection = this.databaseService.getConnection().then();
  }

  /**
   * @name getEmployeeByEmail
   * @description get employee by email
   *
   * @param email email to query employees by
   * @returns employee model
   */
  async getEmployeeByEmail(email: string): Promise<EmployeeModel | null> {
    try {
      const query = `SELECT * FROM ${this.collectionName} WHERE ${ILike('email', email)}`;
      const rows = await (await this.connection).query(query);

      return this.transformQueryResultToEmployeeModel(rows[0]);
    } catch (error) {
      this.logger.error('Error getting employee by email', error.stack);
      throw new BadRequestException('Error getting employee by email');
    }
  }

  /**
   * @name save
   * @description save employee data
   *
   * @param entity object representing employee data
   * @returns saved employee model
   */
  async save(entity: Partial<EmployeeModel>): Promise<EmployeeModel> {
    const userId = uuidv4();
    const userDocument = {
      ...entity,
      id: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const builder = new QueryBuilder<EmployeeModel>()
      .from(this.collectionName)
      .insert(userDocument)
      .build();
    try {
      const result = await (await this.connection).query(builder);
      return this.transformQueryResultToEmployeeModel(result[0]);
    } catch (error) {
      this.logger.error('Error getting employee by email', error.stack);
      throw new BadRequestException('Error saving employee data');
    }
  }

  /**
   * @name findOne
   * @description get employee by query options
   *
   * @param options options to query employee by
   * @returns Employee retrieved by the query
   */
  async findOne(
    options: IFindOneOptions<EmployeeModel>,
  ): Promise<EmployeeModel | null> {
    const builder: string = new QueryBuilder<EmployeeModel>()
      .findOne()
      .from(this.collectionName)
      .where(options.where)
      .build();

    try {
      const result = await (await this.connection).query(builder);

      return this.transformQueryResultToEmployeeModel(result[0]);
    } catch (error) {
      this.logger.error('Error getting employee', error.stack);
      throw error;
    }
  }

  /**
   * @name find
   * @description get employees by query options
   *
   * @param options options to query employees by
   * @returns Employee retrieved by the query
   */
  async find(options: IFindOptions<EmployeeModel>): Promise<EmployeeModel[]> {
    const builder = new QueryBuilder<EmployeeModel>()
      .findAll()
      .from(this.collectionName)
      .where(options.where)
      .build();
    try {
      const result = await (await this.connection).query(builder);

      return this.transformQueryResultToEmployeesModel(result);
    } catch (error) {
      this.logger.error('Error getting employees', error.stack);
      throw error;
    }
  }

  /**
   * @name update
   * @description update employee data
   *
   * @param id unique identifier of the employee
   * @param entity object representing employee data
   * @returns updated employee object
   */
  async update(
    id: string,
    entity: Partial<EmployeeModel>,
  ): Promise<EmployeeModel> {
    const builder = new QueryBuilder<EmployeeModel>()
      .from(this.collectionName)
      .update(entity)
      .where({ id })
      .build();

    try {
      const existingUser = await (
        await this.connection
      ).query(
        new QueryBuilder<EmployeeModel>()
          .findOne()
          .from(this.collectionName)
          .where({ id })
          .build(),
      );

      if (!existingUser) {
        throw new BadRequestException('Employee to be updated does not exist');
      }

      const result = await (await this.connection).query(builder);
      return this.transformQueryResultToEmployeeModel(result[0]);
    } catch (error) {
      this.logger.error('Error updating employee', error.stack);
      throw error;
    }
  }

  /**
   * @name paginate
   * @description paginate employees
   *
   * @param options pagination options
   * @param searchOptions filters to search db by
   * @returns data matching the search options
   */
  async paginate(
    options: IPaginateOptions,
    searchOptions?: IFindOptions<EmployeeModel>,
  ): Promise<IPaginateResult<EmployeeModel>> {
    const { page, limit, sort } = options;
    const builder = new QueryBuilder<EmployeeModel>()
      .findAll()
      .from(this.collectionName)
      .where(searchOptions?.where)
      .orderBy(sort as keyof EmployeeModel)
      .limit(limit)
      .offset((page - 1) * limit)
      .build();

    try {
      const result = await (await this.connection).query(builder);

      return {
        data: this.transformQueryResultToEmployeesModel(result),
        limit,
        itemCount: result.length,
        itemsPerPage: limit,
        currentPage: page,
      };
    } catch (error) {
      this.logger.error('Error paginating employees', error.stack);
      throw error;
    }
  }

  async delete(id: string): Promise<string> {
    const builder = new QueryBuilder<EmployeeModel>()
      .from(this.collectionName)
      .delete()
      .where({ id })
      .build();

    try {
      await (await this.connection).query(builder);

      return 'Deleted';
    } catch (error) {
      this.logger.error('Error deleting employee', error.stack);
      throw error;
    }
  }

  /**
   * @name transformQueryResultToEmployeeModel
   * @private
   * @param row
   * @returns
   */
  private transformQueryResultToEmployeeModel(row: any): EmployeeModel {
    return {
      id: row.id,
      email: row.email,
      firstName: row.firstName,
      lastName: row.lastName,
      hireDate: row.hireDate,
      avatarUrl: row.avatarUrl,
      phone: row.phone,
      departmentId: row.departmentId,
      role: row.role,
      jobTitle: row.jobTitle,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  private transformQueryResultToEmployeesModel(rows: any[]): EmployeeModel[] {
    return rows.map((r) => {
      return this.transformQueryResultToEmployeeModel(r.employees);
    });
  }
}
