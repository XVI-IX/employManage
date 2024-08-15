import { Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentsService {
  getHello(): string {
    return 'Hello World!';
  }
}
