import { IDatabseService } from '@app/common/domain/adapters';
import { Injectable, Logger } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';
import { envConfig } from '../../config/environment.config';

@Injectable()
export class DatabaseService implements IDatabseService {
  private pool: Pool;
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {
    this.connect();
  }

  async connect() {
    try {
      this.pool = createPool({
        host: envConfig.getDatabaseHost(),
        user: envConfig.getDatabaseUser(),
        password: envConfig.getDatabasePassword(),
        database: envConfig.getDatabase(),
        connectionLimit: 10,
      });

      this.logger.log('Connected to MYSQL database');
    } catch (error) {
      this.logger.error('Error connecting to MYSQL database', error.stack);
    }
  }

  getConnection() {
    return this.pool.getConnection();
  }
}
