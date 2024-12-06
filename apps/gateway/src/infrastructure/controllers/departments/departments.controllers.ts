import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateDepartmentInput,
  UpdateDepartmentInput,
} from 'apps/departments/src/infrastructure/common/schemas/department.schema';

@Controller('/api/v1/departments')
export class DepartmentControllerGateway {
  constructor(
    @Inject('DEPARTMENT_SERVICE')
    private readonly departmentService: ClientProxy,
  ) {}

  @Post('/')
  async createDepartment(@Body() data: CreateDepartmentInput) {
    return this.departmentService.send('createDepartment', data);
  }

  @Get('/')
  async getAllDepartments() {
    return this.departmentService.send('getAllDepartments', {});
  }

  @Get('/:departmentId')
  async getDepartmentById(@Param('departmentId') departmentId: string) {
    return this.departmentService.send('getDepartmentById', {
      id: departmentId,
    });
  }

  @Put('/:departmentId')
  async updateDepartment(
    @Param('departmentId') departmentId: string,
    @Body() data: UpdateDepartmentInput,
  ) {
    return this.departmentService.send('updateDepartment', {
      id: departmentId,
      ...data,
    });
  }

  @Delete('/:departmentId')
  async deleteDepartment(@Param('departmentId') departmentId: string) {
    return this.departmentService.send('deleteDepartment', {
      id: departmentId,
    });
  }
}
