import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { DynamicModule, Module } from '@nestjs/common';
import { ProjectRepositoryModule } from '../repositories/projects.repository.module';
import { RepositoriesModule } from 'apps/employees/src/infrastructure/repositories/repositories.module';
import { DepartmentRepositoryModule } from 'apps/departments/src/infrastructure/repositories/repositories.module';
import { ProjectRepository } from '../repositories/projects.repository';
import { EmployeeRepository } from 'apps/employees/src/infrastructure/repositories/employees.repository';
import { DepartmentRepository } from 'apps/departments/src/infrastructure/repositories/department.repository';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { CreateProjectUseCase } from '../../usecase/createProject.usecase';

@Module({
  imports: [
    DatabaseModule,
    ProjectRepositoryModule,
    RepositoriesModule,
    DepartmentRepositoryModule,
  ],
})
export class ProjectsGeneralUseCaseProxy {
  static CREATE_PROJECT_USE_CASE_PROXY = 'CREATE_PROJECT_USE_CASE_PROXY';
  static GET_ALL_PROJECTS_USE_CASE_PROXY = 'GET_ALL_PROJECTS_USE_CASE_PROXY';
  static GET_PROJECT_BY_ID_USE_CASE_PROXY = 'GET_PROJECT_BY_ID_USE_CASE_PROXY';
  static UPDATE_PROJECT_USE_CASE_PROXY = 'UPDATE_PROJECT_USE_CASE_PROXY';
  static DELETE_PROJECT_USE_CASE_PROXY = 'DELETE_PROJECT_USE_CASE_PROXY';
  static GET_PROJECTS_BY_DEPARTMENT_ID_USE_CASE_PROXY =
    'GET_PROJECTS_BY_DEPARTMENT_ID_USE_CASE_PROXY';
  static GET_ALL_PROJECT_ASSIGNEES_USE_CASE_PROXY =
    'GET_ALL_PROJECT_ASSIGNEES_USE_CASE_PROXY';
  static GET_ALL_DUE_PROJECTS_USE_CASE_PROXY =
    'GET_ALL_DUE_PROJECTS_USE_CASE_PROXY';
  static GET_ALL_PENDING_PROJECTS_USE_CASE_PROXY =
    'GET_ALL_PENDING_PROJECTS_USE_CASE_PROXY';
  static GET_ALL_COMPLETED_PROJECTS_USE_CASE_PROXY =
    'GET_ALL_COMPLETED_PROJECTS_USE_CASE_PROXY';
  static GET_ALL_SUPERVISOR_PROJECTS_USE_CASE_PROXY =
    'GET_ALL_SUPERVISOR_PROJECTS_USE_CASE_PROXY';

  static register(): DynamicModule {
    return {
      module: ProjectsGeneralUseCaseProxy,
      providers: [
        {
          inject: [ProjectRepository, EmployeeRepository, DepartmentRepository],
          provide: ProjectsGeneralUseCaseProxy.CREATE_PROJECT_USE_CASE_PROXY,
          useFactory: (
            projectRepository: ProjectRepository,
            employeeRepository: EmployeeRepository,
            departmentRepository: DepartmentRepository,
          ) =>
            new UseCaseProxy(
              new CreateProjectUseCase(
                projectRepository,
                employeeRepository,
                departmentRepository,
              ),
            ),
        },
      ],
      exports: [
        ProjectsGeneralUseCaseProxy.CREATE_PROJECT_USE_CASE_PROXY,
        // ProjectsGeneralUseCaseProxy.GET_ALL_PROJECTS_USE_CASE_PROXY,
        // ProjectsGeneralUseCaseProxy.GET_PROJECT_BY_ID_USE_CASE_PROXY,
        // ProjectsGeneralUseCaseProxy.UPDATE_PROJECT_USE_CASE_PROXY,
        // ProjectsGeneralUseCaseProxy.DELETE_PROJECT_USE_CASE_PROXY,
        // ProjectsGeneralUseCaseProxy.GET_PROJECTS_BY_DEPARTMENT_ID_USE_CASE_PROXY,
        // ProjectsGeneralUseCaseProxy.GET_ALL_PROJECT_ASSIGNEES_USE_CASE_PROXY,
        // ProjectsGeneralUseCaseProxy.GET_ALL_DUE_PROJECTS_USE_CASE_PROXY,
        // ProjectsGeneralUseCaseProxy.GET_ALL_PENDING_PROJECTS_USE_CASE_PROXY,
        // ProjectsGeneralUseCaseProxy.GET_ALL_COMPLETED_PROJECTS_USE_CASE_PROXY,
        // ProjectsGeneralUseCaseProxy.GET_ALL_SUPERVISOR_PROJECTS_USE_CASE_PROXY,
      ],
    };
  }
}
