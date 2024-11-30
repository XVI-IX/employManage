import { HttpException, HttpStatus } from '@nestjs/common';
import { ServiceInterface } from '@app/common/domain/adapters';
export class HttpResponse {
  static send<T = any>(message: string, data: ServiceInterface<T>) {
    return {
      status: true,
      message: message ? message : 'Success',
      data: data,
    };
  }

  static error(
    code: string,
    message: string,
    context: Record<string, unknown>,
  ) {
    const data = {
      status: false,
      message,
      data: context,
    };

    throw new HttpException(data, HttpStatus[code]);
  }
}
