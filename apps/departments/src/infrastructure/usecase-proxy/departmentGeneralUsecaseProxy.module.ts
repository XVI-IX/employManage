import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { DynamicModule, Module } from '@nestjs/common';
import { DepartmentRepositoryModule } from '../repositories/repositories.module';
import { DepartmentRepository } from '../repositories/department.repository';
import { GetAllDepartmentsUseCase } from '../../usecases/getAllDepartments.usecase';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { GetDepartmentById } from '../../usecases/getDepartmentById.usecase';
import { CreateDepartmentUseCase } from '../../usecases/createDepartment.usecase';
import { updateDepartmentUseCase } from '../../usecases/updateDepartment.usecase';
import { DeleteDepartmentUseCase } from '../../usecases/deleteDepartment.usecase';

@Module({
  imports: [DatabaseModule, DepartmentRepositoryModule],
})
export class DepartmentGeneralUseCaseProxyModule {
  static GET_ALL_DEPARTMENTS_USE_CASE_PROXY =
    'GET_ALL_DEPARTMENTS_USE_CASE_PROXY';
  static GET_DEPARTMENT_BY_ID_USE_CASE_PROXY =
    'GET_DEPARTMENT_BY_ID_USE_CASE_PROXY';
  static CREATE_DEPARTMENT_USE_CASE_PROXY = 'CREATE_DEPARTMENT_USE_CASE_PROXY';
  static UPDATE_DEPARTMENT_USE_CASE_PROXY = 'UPDATE_DEPARTMENT_USE_CASE_PROXY';
  static DELETE_DEPARTMENT_USE_CASE_PROXY = 'DELETE_DEPARTMENT_USE_CASE_PROXY';

  static register(): DynamicModule {
    return {
      module: DepartmentGeneralUseCaseProxyModule,
      providers: [
        {
          inject: [DepartmentRepository],
          provide:
            DepartmentGeneralUseCaseProxyModule.GET_ALL_DEPARTMENTS_USE_CASE_PROXY,
          useFactory: (departmentRepository: DepartmentRepository) =>
            new UseCaseProxy(
              new GetAllDepartmentsUseCase(departmentRepository),
            ),
        },
        {
          inject: [DepartmentRepository],
          provide:
            DepartmentGeneralUseCaseProxyModule.GET_DEPARTMENT_BY_ID_USE_CASE_PROXY,
          useFactory: (departmentRepository: DepartmentRepository) =>
            new UseCaseProxy(new GetDepartmentById(departmentRepository)),
        },
        {
          inject: [DepartmentRepository],
          provide:
            DepartmentGeneralUseCaseProxyModule.CREATE_DEPARTMENT_USE_CASE_PROXY,
          useFactory: (departmentRepository: DepartmentRepository) =>
            new UseCaseProxy(new CreateDepartmentUseCase(departmentRepository)),
        },
        {
          inject: [DepartmentRepository],
          provide:
            DepartmentGeneralUseCaseProxyModule.UPDATE_DEPARTMENT_USE_CASE_PROXY,
          useFactory: (departmentRepository: DepartmentRepository) =>
            new UseCaseProxy(new updateDepartmentUseCase(departmentRepository)),
        },
        {
          inject: [DepartmentRepository],
          provide:
            DepartmentGeneralUseCaseProxyModule.DELETE_DEPARTMENT_USE_CASE_PROXY,
          useFactory: (departmentRepository: DepartmentRepository) =>
            new UseCaseProxy(new DeleteDepartmentUseCase(departmentRepository)),
        },
      ],
      exports: [
        DepartmentGeneralUseCaseProxyModule.GET_ALL_DEPARTMENTS_USE_CASE_PROXY,
        DepartmentGeneralUseCaseProxyModule.GET_DEPARTMENT_BY_ID_USE_CASE_PROXY,
        DepartmentGeneralUseCaseProxyModule.CREATE_DEPARTMENT_USE_CASE_PROXY,
        DepartmentGeneralUseCaseProxyModule.UPDATE_DEPARTMENT_USE_CASE_PROXY,
        DepartmentGeneralUseCaseProxyModule.DELETE_DEPARTMENT_USE_CASE_PROXY,
      ],
    };
  }
}
