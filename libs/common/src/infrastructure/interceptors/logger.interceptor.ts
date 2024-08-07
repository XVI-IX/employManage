import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const ip = this.getIp(request);

    this.logger.log(
      `Incoming Request on ${request.path}`,
      `method=${request.method} ip=${ip}`,
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `End Request for ${request.path}`,
          `method=${request.method} ip=${ip} duration=${Date.now() - now}ms`,
        );
      }),
    );
  }

  private getIp(request: any): string {
    let ip: string;
    const ipAddr = request.headers['x-forwared-for'];

    if (ipAddr) {
      const list = ipAddr.split(',');
      ip = list[list.length - 1];
    } else {
      ip = request.connection.remoteAddress;
    }

    return ip.replace('::ffff:', '');
  }
}
