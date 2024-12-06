import { Controller, Inject } from '@nestjs/common';
import { DepartmentGeneralUseCaseProxyModule } from '../usecase-proxy/departmentGeneralUsecaseProxy.module';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { CreateDepartmentUseCase } from '../../usecases/createDepartment.usecase';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateDepartmentInput,
  UpdateDepartmentInput,
} from '../common/schemas/department.schema';
import { HttpResponse } from '@app/common/infrastructure/helpers/response.helper';
import { GetDepartmentByIdUseCase } from '../../usecases/getDepartmentById.usecase';
import { GetAllDepartmentsUseCase } from '../../usecases/getAllDepartments.usecase';
import { updateDepartmentUseCase } from '../../usecases/updateDepartment.usecase';
import { DeleteDepartmentUseCase } from '../../usecases/deleteDepartment.usecase';

@Controller('departments')
export class DepartmentController {
  constructor(
    @Inject(
      DepartmentGeneralUseCaseProxyModule.CREATE_DEPARTMENT_USE_CASE_PROXY,
    )
    private readonly createDepartmentUseCase: UseCaseProxy<CreateDepartmentUseCase>,
    @Inject(
      DepartmentGeneralUseCaseProxyModule.GET_ALL_DEPARTMENTS_USE_CASE_PROXY,
    )
    private readonly getAllDepartmentsUseCase: UseCaseProxy<GetAllDepartmentsUseCase>,
    @Inject(
      DepartmentGeneralUseCaseProxyModule.GET_DEPARTMENT_BY_ID_USE_CASE_PROXY,
    )
    private readonly getDepartmentByIdUseCase: UseCaseProxy<GetDepartmentByIdUseCase>,
    @Inject(
      DepartmentGeneralUseCaseProxyModule.UPDATE_DEPARTMENT_USE_CASE_PROXY,
    )
    private readonly updateDepartmentUseCase: UseCaseProxy<updateDepartmentUseCase>,
    @Inject(
      DepartmentGeneralUseCaseProxyModule.DELETE_DEPARTMENT_USE_CASE_PROXY,
    )
    private readonly deleteDepartmentUseCase: UseCaseProxy<DeleteDepartmentUseCase>,
  ) {}

  @MessagePattern('createDepartment')
  async createDepartment(@Payload() data: CreateDepartmentInput) {
    const response = await this.createDepartmentUseCase
      .getInstance()
      .createDepartment(data);

    return HttpResponse.send('Department created successfully', response);
  }

  @MessagePattern('getAllDepartments')
  async getAllDepartments() {
    const response = await this.getAllDepartmentsUseCase
      .getInstance()
      .getAllDepartments();

    return HttpResponse.send('Departments retrieved successfully', response);
  }

  @MessagePattern('getDepartmentById')
  async getDepartmentById(@Payload() data: { id: string }) {
    const response = await this.getDepartmentByIdUseCase
      .getInstance()
      .getDepartmentById(data.id);

    return HttpResponse.send('Department retrieved successfully', response);
  }

  @MessagePattern('updateDepartment')
  async updateDepartment(@Payload() data: UpdateDepartmentInput) {
    const response = await this.updateDepartmentUseCase
      .getInstance()
      .updateDepartment(data.id, data);

    return HttpResponse.send('Department updated successfully', response);
  }

  @MessagePattern('deleteDepartment')
  async deleteDepartment(@Payload() data: { id: string }) {
    const response = await this.deleteDepartmentUseCase
      .getInstance()
      .deleteDepartment(data.id);

    return HttpResponse.send('Department deleted successfully', response);
  }
}
