import * as env from 'env-var';
import { config } from 'dotenv';
import { IEnvironmentInterface } from '@app/common/domain/config/environment.interface';

config();

class EnvironmentConfig implements IEnvironmentInterface {
  getURL(): string {
    throw new Error('Method not implemented.');
  }
  getAdminMail(): string {
    throw new Error('Method not implemented.');
  }
  getResetSecret(): string {
    throw new Error('Method not implemented.');
  }
  getEmailHost(): string {
    throw new Error('Method not implemented.');
  }
  getEmailPort(): string {
    throw new Error('Method not implemented.');
  }
  getEmailPassword(): string {
    throw new Error('Method not implemented.');
  }
  getEmailUsername(): string {
    throw new Error('Method not implemented.');
  }
  getDatabaseUrl(): string {
    throw new Error('Method not implemented.');
  }
  getPaystackKey(): string {
    throw new Error('Method not implemented.');
  }
  getJwtExpiration(): string {
    return env.get('JWT_EXPIRATION').asString();
  }
  getPaginationLimit(): number {
    throw new Error('Method not implemented.');
  }
  getOpensourceMapsKey(): string {
    throw new Error('Method not implemented.');
  }
  getOpenRouteUrl(): string {
    throw new Error('Method not implemented.');
  }
  getEarthRadius(): number {
    throw new Error('Method not implemented.');
  }

  getEnvironment(): string {
    return 'production';
  }

  getPort(): number {
    return env.get('PORT').asInt() || 3000;
  }

  getEmployeeServicePort(): number {
    return env.get('EMPLOYEE_SERVICE_PORT').asInt();
  }

  getTaskServicePort(): number {
    return env.get('TASKS_SERVICE_PORT').asInt();
  }

  getDepartmentServicePort(): number {
    return env.get('DEPARTMENT_SERVICE_PORT').asInt();
  }

  getAttendanceServicePort(): number {
    return env.get('ATTENDANCE_SERVICE_PORT').asInt();
  }

  getProjectServicePort(): number {
    return env.get('PROJECTS_SERVICE_PORT').asInt();
  }

  getNotifcationServicePort(): number {
    return env.get('NOTIFICATION_SERVICE_PORT').asInt();
  }

  getMicroServicesHost(): string {
    return env.get('MICROSERVICES_HOST').asString();
  }

  getJWTSecret(): string {
    return env.get('JWT_SECRET').asString();
  }

  getDatabase(): string {
    return env.get('DATABASE_NAME').asString();
  }

  getDatabaseHost(): string {
    return env.get('DATABASE_HOST').asString();
  }

  getDatabasePassword(): string {
    return env.get('DATABASE_PASSWORD').asString();
  }

  getDatabaseUser(): string {
    return env.get('DATABASE_USER').asString();
  }

  getDatabasePort(): number {
    return env.get('DATABASE_PORT').asInt() || 3306;
  }

  getRedisHost(): string {
    return env.get('REDIS_HOST').asString();
  }

  getRedisPort(): number {
    return env.get('REDIS_PORT').asInt();
  }

  getRedisPassword(): string {
    return env.get('REDIS_PASSWORD').asString();
  }
}

export const envConfig = new EnvironmentConfig();
