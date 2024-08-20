import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories';
import { DatabaseService } from '@app/common/infrastructure/services/database/database.service';
import { EmployeeModel } from '../../domain/model';
import { ILike } from '@app/common/infrastructure/services/database';
import { Connection } from 'mysql2/promise';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  private logger: Logger;
  private collectionName = 'employees';
  private connection: Connection;
  constructor(private readonly databaseService: DatabaseService) {
    this.logger = new Logger(EmployeeRepository.name);
    this.connection = this.databaseService.getConnection();
  }

  async getEmployeeByEmail(email: string): Promise<EmployeeModel | null> {
    try {
      const query = `SELECT * FROM ${this.collectionName} WHERE ${ILike('email', email)}`;
      const rows = await this.connection.query(query);

      return this.transformQueryResultToEmployeeModel(rows[0]);
    } catch (error) {
      this.logger.error('Error getting employee by email', error.stack);
      throw new BadRequestException('Error getting employee by email');
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
