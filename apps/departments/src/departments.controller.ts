import { Controller, Get } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller()
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  getHello(): string {
    return this.departmentsService.getHello();
  }
}
