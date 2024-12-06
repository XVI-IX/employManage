import { DatabaseService } from '@app/common/infrastructure/services/database/database.service';
import { IAttendanceRepository } from '../../domain/repositories';
import { AttendanceModel } from '../../domain/models';
import {
  IFindOptions,
  IFindOneOptions,
  IPaginateOptions,
  IPaginateResult,
} from '@app/common/domain/adapters';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { QueryBuilder } from '@app/common/infrastructure/services/database/database.query.builder';

export class AttendanceRepository implements IAttendanceRepository {
  private readonly collectionName = 'attendance';
  private readonly logger: Logger;
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
    try {
      throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }

  async getAttendanceByEmployeeIdAndDateRange(
    employeeId: string,
    startDate: string,
    endDate: string,
  ): Promise<AttendanceModel[]> {
    throw new Error('Method not implemented.');
  }

  async find?(
    options: IFindOptions<AttendanceModel>,
  ): Promise<AttendanceModel[]> {
    throw new Error('Method not implemented.');
  }

  async findOne?(
    query: IFindOneOptions<AttendanceModel>,
  ): Promise<AttendanceModel> {
    throw new Error('Method not implemented.');
  }

  async paginate?(
    options: IPaginateOptions,
    searchOptions?: IFindOptions<AttendanceModel>,
  ): Promise<IPaginateResult<AttendanceModel>> {
    throw new Error('Method not implemented.');
  }

  async delete?(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async update?(
    id: string,
    entity: Partial<AttendanceModel>,
  ): Promise<AttendanceModel> {
    throw new Error('Method not implemented.');
  }

  async save(entity: Partial<AttendanceModel>): Promise<AttendanceModel> {}

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
