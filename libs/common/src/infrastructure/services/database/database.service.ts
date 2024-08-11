import { IDatabseService } from '@app/common/domain/adapters';
import { Injectable, Logger } from '@nestjs/common';
import { Connection, createConnection } from 'mysql2/promise';

@Injectable()
export class DatabaseService implements IDatabseService {
  private connection: Connection;
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {
    this.connect();
  }

  private async connect() {
    try {
      this.connection = await createConnection({
        host: 'localhost',
        user: 'test',
        password: 'test',
        database: 'employmanage',
      });

      this.logger.log('Connected to MYSQL database');
    } catch (error) {
      this.logger.error('Error connecting to MYSQL database', error.stack);
    }
  }

  getConnection(): Connection {
    return this.connection;
  }
}
