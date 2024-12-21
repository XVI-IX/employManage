import { IAttendanceRepository } from '../../domain/repositories';
import { AttendanceModel } from '../../domain/models';
import {
  IFindOptions,
  IFindOneOptions,
  IPaginateOptions,
  IPaginateResult,
} from '@app/common/domain/adapters';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { QueryBuilder } from '@app/common/infrastructure/services/database/database.query.builder';
import { DatabaseService } from '@app/common/infrastructure/services/database/database.service';

@Injectable()
export class AttendanceRepository implements IAttendanceRepository {
  private collectionName = 'Attendance';
  private logger: Logger;
  // private connection: Promise<PoolConnection>;

  constructor(private readonly databaseService: DatabaseService) {
    this.logger = new Logger(AttendanceRepository.name);
  }

  /**
   * @name getAttendanceByEmployeeId
   * @description Get attendance records for an employee
   *
   * @param employeeId Employee ID
   * @returns Attendance records for the employee
   */
  async getAttendanceByEmployeeId(
    employeeId: string,
  ): Promise<AttendanceModel[]> {
    const builder = new QueryBuilder<AttendanceModel>()
      .from(this.collectionName)
      .findAll()
      .where({ employeeId })
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result || result.length === 0) {
        throw new NotFoundException('Attendance not found');
      }

      return this.transformQueryResultToAttendanceModelArray(result);
    } catch (error) {
      this.logger.error('Error getting attendance by employee id', error.stack);
      throw new BadRequestException('Error getting attendance by employee id');
    }
  }

  /**
   * @name getAttendanceByDate
   * @description Get attendance record for all employees on a specific date
   *
   * @param date Date to query attendance by
   * @returns Attendance record for the employees on the specified date
   */
  async getAttendanceByDate(date: string): Promise<AttendanceModel | null> {
    const builder: string = new QueryBuilder<AttendanceModel>()
      .select([])
      .from(this.collectionName)
      .where({
        date,
      })
      .build();
    try {
      const result = await this.databaseService.query(builder);

      if (!result || result.length === 0) {
        return null;
      }

      return this.transformQueryResultToAttendanceModel(result[0]);
    } catch (error) {
      this.logger.error('Error getting attendance by date', error.stack);
      throw new BadRequestException('Error getting attendance by date');
    }
  }

  /**
   * @name getAttendanceByEmployeeIdAndDate
   * @description Get attendance record for an employee on a specific date
   *
   * @param employeeId Employee ID
   * @param date Date to query attendance by
   * @returns Attendance record for the employee on the specified date
   */
  async getAttendanceByEmployeeIdAndDate(
    employeeId: string,
    date: string,
  ): Promise<AttendanceModel | null> {
    const builder: string = new QueryBuilder<AttendanceModel>()
      .select([])
      .from(this.collectionName)
      .where({
        employeeId,
      })
      .andWhere({
        date,
      })
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Attendance could not be fetched');
      }

      return this.transformQueryResultToAttendanceModel(result);
    } catch (error) {
      this.logger.error(
        'Error getting attendance by employee id and date',
        error.stack,
      );
      throw new BadRequestException(
        'Error getting attendance by employee id and date',
      );
    }
  }

  async getAttendanceByEmployeeIdAndMonth(
    employeeId: string,
    month: string,
  ): Promise<AttendanceModel[]> {
    const builder = new QueryBuilder<AttendanceModel>()
      .select([])
      .from(this.collectionName)
      .whereMonth({
        field: 'date',
        month,
      })
      .andWhere({
        employeeId,
      })
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Attendance could not be retrieved');
      }

      return this.transformQueryResultToAttendanceModelArray(result);
    } catch (error) {
      this.logger.error(
        'Employee attendance could not be retrieved',
        error.stack,
      );
      throw new BadRequestException(
        'Employee attendance coudl not be retrieved',
      );
    }
  }

  async getAttendanceByEmployeeIdAndYear(
    employeeId: string,
    year: string,
  ): Promise<AttendanceModel[]> {
    const builder = new QueryBuilder<AttendanceModel>()
      .select([])
      .from(this.collectionName)
      .whereYear({
        field: 'date',
        year,
      })
      .andWhere({
        employeeId,
      })
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Attendance could not be retrieved');
      }

      return this.transformQueryResultToAttendanceModelArray(result);
    } catch (error) {
      this.logger.error('Error getting attendance by employee id and year');
      throw new BadRequestException(
        'Error getting attendance by employee id and year',
      );
    }
  }

  async getAttendanceByEmployeeIdAndMonthAndYear(
    employeeId: string,
    month: string,
    year: string,
  ): Promise<AttendanceModel[]> {
    const builder = new QueryBuilder<AttendanceModel>()
      .select([])
      .from(this.collectionName)
      .whereYearAndMonth({
        field: 'date',
        year,
        month,
      })
      .andWhere({
        employeeId,
      })
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Attendance could not be retrieved');
      }

      return this.transformQueryResultToAttendanceModelArray(result);
    } catch (error) {
      this.logger.error('Error getting attendance by employee id and month');
      throw new BadRequestException();
    }
  }

  /**
   * @name getAttendanceByEmployeeIdAndDateRange
   * @description Get attendance records for an employee within a specified date range
   *
   * @param employeeId Unique identifier for the employee to get attendance records for.
   * @param startDate start date for the date range.
   * @param endDate end date for the date range.
   */
  async getAttendanceByEmployeeIdAndDateRange(
    employeeId: string,
    startDate: string,
    endDate: string,
  ): Promise<AttendanceModel[]> {
    const queryString = `SELECT * FROM ${this.collectionName} WHERE employeeId = '${employeeId}' AND date BETWEEN '${startDate}' AND '${endDate};'`;
    try {
      const results = await this.databaseService.query(queryString);

      if (!results || results.length === 0) {
        throw new NotFoundException('Attendance not found');
      }

      return this.transformQueryResultToAttendanceModelArray(results);
    } catch (error) {
      this.logger.error(
        'Error getting attendance by employee id and date range',
        error.stack,
      );
      throw new BadRequestException(
        'Error getting attendance by employee id and date range',
      );
    }
  }

  /**
   * @name getAttendanceByDateRange
   * @description Get attendance records within a specified date range
   *
   * @param start Starting point for the date range
   * @param end Ending point for the date range
   * @returns an array of the attendance records within the specified date range.
   */
  async getAttendanceByDateRange(
    start: string,
    end: string,
  ): Promise<AttendanceModel[]> {
    const queryString = `SELECT * FROM ${this.collectionName} WHERE date BETWEEN '${start}' AND '${end};'`;

    try {
      const result = await this.databaseService.query(queryString);

      if (!result || result.length === 0) {
        throw new NotFoundException('Attendance not found');
      }

      return this.transformQueryResultToAttendanceModelArray(result);
    } catch (error) {
      this.logger.error('Error getting attendance by date range', error.stack);
      throw new BadRequestException('Error getting attendance by date range');
    }
  }

  async find?(
    options: IFindOptions<AttendanceModel>,
  ): Promise<AttendanceModel[]> {
    const builder = new QueryBuilder<AttendanceModel>()
      .findAll()
      .from(this.collectionName)
      .where(options.where)
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result || result.length === 0) {
        throw new NotFoundException('Attendance not found');
      }

      return this.transformQueryResultToAttendanceModelArray(result);
    } catch (error) {
      this.logger.error('Error getting attendance', error.stack);
      throw new BadRequestException('Error getting attendance');
    }
  }

  async findOne?(
    query: IFindOneOptions<AttendanceModel>,
  ): Promise<AttendanceModel> {
    const builder: string = new QueryBuilder<AttendanceModel>()
      .select([])
      .from(this.collectionName)
      .where(query.where)
      .build();


    try {
      const result = await this.databaseService.query(builder);

      if (result.length === 0) {
        return null;
      }

      return this.transformQueryResultToAttendanceModel(result[0]);
    } catch (error) {
      this.logger.error('Error getting attendance', error.stack);
      throw new BadRequestException('Error getting attendance');
    }
  }

  async paginate?(
    options: IPaginateOptions,
    searchOptions?: IFindOptions<AttendanceModel>,
  ): Promise<IPaginateResult<AttendanceModel>> {
    const { page, limit, sort } = options;
    const builder = new QueryBuilder<AttendanceModel>()
      .findAll()
      .from(this.collectionName)
      .where(searchOptions?.where)
      .orderBy(sort as keyof AttendanceModel)
      .limit(limit)
      .offset((page - 1) * limit)
      .build();
    try {
      const result = await this.databaseService.query(builder);

      return {
        data: this.transformQueryResultToAttendanceModelArray(result),
        limit,
        itemCount: result.length,
        itemsPerPage: limit,
        currentPage: page,
      };
    } catch (error) {
      this.logger.error('Error paginating attendance', error.stack);
      throw new BadRequestException('Error paginating attendance');
    }
  }

  async delete?(id: string): Promise<string> {
    const builder = new QueryBuilder<AttendanceModel>()
      .from(this.collectionName)
      .where({ id })
      .delete()
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Attendance could not be deleted.');
      }

      return 'Deleted';
    } catch (error) {
      this.logger.error('Error deleting attendance', error.stack);
      throw new BadRequestException('Error deleting attendance');
    }
  }

  async update?(
    id: string,
    entity: Partial<AttendanceModel>,
  ): Promise<AttendanceModel> {
    const builder = new QueryBuilder<AttendanceModel>()
      .from(this.collectionName)
      .update({ checkOut: entity.checkOut })
      .where({ employeeId: id })
      .andWhere({ date: entity.date })
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Attendance could not be updated');
      }

      return this.transformQueryResultToAttendanceModel(result[0]);
    } catch (error) {
      this.logger.error('Error updating attendance', error.stack);
      throw new BadRequestException('Error updating attendance');
    }
  }

  /**
   * @name save
   * @description Save attendance data
   *
   * @param entity Object containing attendance data
   * @returns clockin attendance data
   */
  async save(entity: Partial<AttendanceModel>): Promise<AttendanceModel> {
    const builder = new QueryBuilder<AttendanceModel>()
      .into(this.collectionName)
      .insert(entity)
      .build();

    console.log(builder);

    try {
      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Attendance could not be saved');
      }

      console.log(result);

      const attendanceQuery = new QueryBuilder<AttendanceModel>()
        .from(this.collectionName)
        .where({ id: entity.id })
        .build();

      const attendanceResult =
        await this.databaseService.query(attendanceQuery);

      if (!attendanceResult) {
        throw new BadRequestException('Attendance could not be saved');
      }

      console.log(attendanceResult);

      return this.transformQueryResultToAttendanceModel(attendanceResult[0]);
    } catch (error) {
      this.logger.error('Error saving attendance', error.stack);
      throw new BadRequestException('Error saving attendance');
    }
  }

  private transformQueryResultToAttendanceModel(row: any): AttendanceModel {
    return {
      id: row.id,
      employeeId: row.employeeId,
      checkIn: row.checkIn,
      checkOut: row.checkOut,
      date: row.date,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  private transformQueryResultToAttendanceModelArray(
    rows: any[],
  ): AttendanceModel[] {
    return rows.map((row) => {
      return this.transformQueryResultToAttendanceModel(row);
    });
  }
}
