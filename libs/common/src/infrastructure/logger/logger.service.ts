import { ILogger } from '@app/common/domain/logger';
import { Injectable, Logger } from '@nestjs/common';
import { envConfig } from '../config/environment.config';

@Injectable()
export class LoggerService extends Logger implements ILogger {
  debug(context: string, message: string) {
    if (envConfig.getEnvironment() !== 'production') {
      super.debug(`[DEBUG] ${message}`, context);
    }
  }

  log(context: string, message: string) {
    super.log(`[INFO] ${message}`, context);
  }

  error(context: string, message: string) {
    super.error(`[ERROR] ${message}`, context);
  }

  warn(context: string, message: string) {
    super.warn(`[WARN] ${message}`, context);
  }

  verbose(context: string, message: string) {
    if (envConfig.getEnvironment() !== 'production') {
      super.verbose(`[VERBOSE] ${message}`, context);
    }
  }
}
