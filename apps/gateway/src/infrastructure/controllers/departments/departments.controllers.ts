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
    try {
      return this.departmentService.send('getAllDepartments', {});
    } catch (error) {
      throw error;
    }
  }

  @Get('/:departmentId')
  async getDepartmentById(@Param('departmentId') departmentId: string) {
    try {
      return this.departmentService.send('getDepartmentById', {
        id: departmentId,
      });
    } catch (error) {
      throw error;
    }
  }

  @Put('/:departmentId')
  async updateDepartment(
    @Param('departmentId') departmentId: string,
    @Body() data: UpdateDepartmentInput,
  ) {
    try {
      return this.departmentService.send('updateDepartment', {
        id: departmentId,
        ...data,
      });
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:departmentId')
  async deleteDepartment(@Param('departmentId') departmentId: string) {
    try {
      return this.departmentService.send('deleteDepartment', {
        id: departmentId,
      });
    } catch (error) {
      throw error;
    }
  }
}
