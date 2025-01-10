import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { DynamicModule, Module } from '@nestjs/common';
import { TaskRepositoryModule } from '../repositories/task.repository.module';
import { RepositoriesModule } from 'apps/employees/src/infrastructure/repositories/repositories.module';
import { TaskRepository } from '../repositories/tasks.repository';
import { EmployeeRepository } from 'apps/employees/src/infrastructure/repositories/employees.repository';
import { DepartmentRepository } from 'apps/departments/src/infrastructure/repositories/department.repository';
import { ProjectRepositoryModule } from 'apps/projects/src/infrastructure/repositories/projects.repository.module';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { CreateTaskUseCase } from '../../usecases/createTask.usecase';
import { ProjectRepository } from 'apps/projects/src/infrastructure/repositories/projects.repository';
import { GetAllTasksUseCase } from '../../usecases/getAllTasks.usecase';
import { GetTaskByIdUseCase } from '../../usecases/getTaskById.usecase';
import { UpdateTaskUseCase } from '../../usecases/updateTask.usecase';
import { GetTaskByProjectIdUseCase } from '../../usecases/getTaskByProjectId.usecase';
import { GetTasksByProjectIdAndStatus } from '../../usecases/getTasksByProjectIdAndStatus.usecase';

@Module({
  imports: [
    DatabaseModule,
    TaskRepositoryModule,
    DepartmentRepository,
    EmployeeRepository,
    ProjectRepositoryModule,
    RepositoriesModule,
  ],
})
export class TasksGeneralUsecaseProxyModule {
  static CREATE_TASK_USE_CASE_PROXY = 'CREATE_TASK_USE_CASE_PROXY';
  static GET_ALL_TASKS_USE_CASE_PROXY = 'GET_ALL_TASKS_USE_CASE_PROXY';
  static GET_TASK_BY_ID_USE_CASE_PROXY = 'GET_TASK_BY_ID_USE_CASE_PROXY';
  static UPDATE_TASK_USE_CASE_PROXY = 'UPDATE_TASK_USE_CASE_PROXY';
  static DELETE_TASK_USE_CASE_PROXY = 'DELETE_TASK_USE_CASE_PROXY';
  static GET_TASKS_BY_DEPARTMENT_ID_USE_CASE_PROXY =
    'GET_TASKS_BY_DEPARTMENT_ID_USE_CASE_PROXY';
  static GET_TASKS_BY_PROJECT_ID_USE_CASE_PROXY =
    'GET_TASKS_BY_PROJECT_ID_USE_CASE_PROXY';
  static GET_TASKS_BY_PROJECT_ID_AND_EMPLOYEE_ID_AND_STATUS_USE_CASE_PROXY =
    'GET_TASKS_BY_PROJECT_ID_AND_EMPLOYEE_ID_AND_STATUS_USE_CASE_PROXY';
  static GET_TASKS_BY_EMPLOYEE_ID_USE_CASE_PROXY =
    'GET_TASKS_BY_EMPLOYEE_ID_USE_CASE_PROXY';
  static GET_TASKS_BY_EMPLOYEE_ID_AND_PROJECT_ID_USE_CASE_PROXY =
    'GET_TASKS_BY_EMPLOYEE_ID_AND_PROJECT_ID_USE_CASE_PROXY';
  static GET_TASKS_BY_PROJECT_ID_AND_STATUS_USE_CASE_PROXY =
    'GET_TASKS_BY_PROJECT_ID_AND_STATUS_USE_CASE_PROXY';

  static register(): DynamicModule {
    return {
      module: TasksGeneralUsecaseProxyModule,
      providers: [
        {
          inject: [
            TaskRepository,
            EmployeeRepository,
            ProjectRepositoryModule,
            DepartmentRepository,
          ],
          provide: TasksGeneralUsecaseProxyModule.CREATE_TASK_USE_CASE_PROXY,
          useFactory: (
            taskRepository: TaskRepository,
            employeeRepository: EmployeeRepository,
            projectRepository: ProjectRepository,
          ) =>
            new UseCaseProxy(
              new CreateTaskUseCase(
                taskRepository,
                employeeRepository,
                projectRepository,
              ),
            ),
        },
        {
          inject: [TaskRepository],
          provide: TasksGeneralUsecaseProxyModule.GET_ALL_TASKS_USE_CASE_PROXY,
          useFactory: (taskRepository: TaskRepository) =>
            new UseCaseProxy(new GetAllTasksUseCase(taskRepository)),
        },
        {
          inject: [TaskRepository],
          provide: TasksGeneralUsecaseProxyModule.GET_TASK_BY_ID_USE_CASE_PROXY,
          useFactory: (taskRespository: TaskRepository) =>
            new UseCaseProxy(new GetTaskByIdUseCase(taskRespository)),
        },
        {
          inject: [TaskRepository],
          provide: TasksGeneralUsecaseProxyModule.UPDATE_TASK_USE_CASE_PROXY,
          useFactory: (taskRepository: TaskRepository) =>
            new UseCaseProxy(new UpdateTaskUseCase(taskRepository)),
        },
        {
          inject: [TaskRepository],
          provide:
            TasksGeneralUsecaseProxyModule.GET_TASKS_BY_PROJECT_ID_USE_CASE_PROXY,
          useFactory: (taskRepository: TaskRepository) =>
            new UseCaseProxy(new GetTaskByProjectIdUseCase(taskRepository)),
        },
        {
          inject: [TaskRepository],
          provide:
            TasksGeneralUsecaseProxyModule.GET_TASKS_BY_PROJECT_ID_AND_STATUS_USE_CASE_PROXY,
          useFactory: (taskRepository: TaskRepository) =>
            new UseCaseProxy(new GetTasksByProjectIdAndStatus(taskRepository)),
        },
      ],
    };
  }
}
