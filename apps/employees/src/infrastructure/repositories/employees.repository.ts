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
      const [response, _] = await this.connection.query(query);

      return response[0] as EmployeeModel;
    } catch (error) {
      this.logger.error('Error getting employee by email', error.stack);
      throw new BadRequestException('Error getting employee by email');
    }
  }
}
