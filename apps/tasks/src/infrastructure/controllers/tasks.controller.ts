import { Controller, Inject } from '@nestjs/common';
import { TasksGeneralUsecaseProxyModule } from '../usecase-proxy/tasksGeneral.usecase-proxy.module';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { CreateTaskUseCase } from '../../usecases/createTask.usecase';
import { ClientProxy, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateTaskInput } from '../common/schemas/tasks.schema';
import { HttpResponse } from '@app/common/infrastructure/helpers/response.helper';
import { GetAllTasksUseCase } from '../../usecases/getAllTasks.usecase';
import { GetTaskByIdUseCase } from '../../usecases/getTaskById.usecase';
import { TasksModel } from '../../domain/models/tasks.model';
import { UpdateTaskUseCase } from '../../usecases/updateTask.usecase';
import { DeleteTaskUseCase } from '../../usecases/deleteTasks.usecase';
import { GetTaskByProjectIdUseCase } from '../../usecases/getTaskByProjectId.usecase';
// import { GetTasksByProjectIdAndStatus } from '../../usecases/getTasksByProjectIdAndStatus.usecase';
import { GetTasksByEmployeeId } from '../../usecases/getTasksByEmployeeId.usecase';
import { GetTaskByProjectIdAndEmployeeIdAndStatusUseCase } from '../../usecases/getTaskByProjectIdAndEmployeeIdAndStatus.usecase';
import { GetTasksByStatusUseCase } from '../../usecases/findTasksByStatus.usecase';

@Controller()
export class TasksController {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly notificationService: ClientProxy,
    @Inject(TasksGeneralUsecaseProxyModule.CREATE_TASK_USE_CASE_PROXY)
    private readonly createTaskUseCase: UseCaseProxy<CreateTaskUseCase>,
    @Inject(TasksGeneralUsecaseProxyModule.GET_ALL_TASKS_USE_CASE_PROXY)
    private readonly getAllTasksUseCase: UseCaseProxy<GetAllTasksUseCase>,
    @Inject(TasksGeneralUsecaseProxyModule.GET_TASK_BY_ID_USE_CASE_PROXY)
    private readonly getTaskByIdUseCase: UseCaseProxy<GetTaskByIdUseCase>,
    @Inject(TasksGeneralUsecaseProxyModule.UPDATE_TASK_USE_CASE_PROXY)
    private readonly updateTaskUseCase: UseCaseProxy<UpdateTaskUseCase>,
    @Inject(TasksGeneralUsecaseProxyModule.DELETE_TASK_USE_CASE_PROXY)
    private readonly deleteTaskUseCase: UseCaseProxy<DeleteTaskUseCase>,
    @Inject(
      TasksGeneralUsecaseProxyModule.GET_TASKS_BY_PROJECT_ID_USE_CASE_PROXY,
    )
    private readonly getTasksByProjectIdUseCase: UseCaseProxy<GetTaskByProjectIdUseCase>,
    // // @Inject(TasksGeneralUsecaseProxyModule.GET_TASKS_BY_DEPARTMENT_ID_USE_CASE_PROXY) private readonly getTasksByDepartmentIdUseCase: UseCaseProxy<GetTask>,
    @Inject(
      TasksGeneralUsecaseProxyModule.GET_TASKS_BY_PROJECT_ID_AND_EMPLOYEE_ID_AND_STATUS_USE_CASE_PROXY,
    )
    private readonly getTasksByProjectIdAndEmployeeIdAndStatusUseCase: UseCaseProxy<GetTaskByProjectIdAndEmployeeIdAndStatusUseCase>,
    @Inject(
      TasksGeneralUsecaseProxyModule.GET_TASKS_BY_EMPLOYEE_ID_USE_CASE_PROXY,
    )
    private readonly getTasksByEmployeeIdUseCase: UseCaseProxy<GetTasksByEmployeeId>,
    @Inject(TasksGeneralUsecaseProxyModule.GET_TASKS_BY_STATUS_USE_CASE_PROXY)
    private readonly getTasksByStatusUseCase: UseCaseProxy<GetTasksByStatusUseCase>,
  ) {}

  @MessagePattern('createTask')
  async createTask(@Payload() data: CreateTaskInput) {
    try {
      const task = await this.createTaskUseCase
        .getInstance()
        .createTaskRepository(data);

        this.notificationService.emit('createNotification', task)

      return HttpResponse.send('Task created', task);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern('getAllTasks')
  async getAllTasks() {
    try {
      const tasks = await this.getAllTasksUseCase
        .getInstance()
        .getAllTasksUseCase();

      return HttpResponse.send('Tasks fetched', tasks);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('getTaskById')
  async getTaskById(@Payload() data: { taskId: string }) {
    try {
      const task = await this.getTaskByIdUseCase
        .getInstance()
        .getTaskById(data.taskId);

      return HttpResponse.send('Task Retrieved', task);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('updateTask')
  async updateTask(
    @Payload() data: { taskId: string; data: Partial<TasksModel> },
  ) {
    try {
      const task = await this.updateTaskUseCase
        .getInstance()
        .updateTask(data.taskId, data.data);

      return HttpResponse.send('Task updated', task);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('deleteTask')
  async deleteTask(@Payload() data: { taskId: string }) {
    try {
      await this.deleteTaskUseCase.getInstance().deleteTask(data.taskId);

      return HttpResponse.send('Task deleted', {});
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('getTasksByStatus')
  async GetTasksByStatus(@Payload() data: { status: string }) {
    try {
      const tasks = await this.getTasksByStatusUseCase
        .getInstance()
        .getTasksByStatus(data.status);

      return HttpResponse.send('Tasks fetched', tasks);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('getTaskByProjectId')
  async getTasksByProjectId(@Payload() data: { projectId: string }) {
    try {
      const tasks = await this.getTasksByProjectIdUseCase
        .getInstance()
        .getTaskByProjectId(data.projectId);

      return HttpResponse.send('Tasks fetched', tasks);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('getTasksByProjectIdAndEmployeeIdAndStatus')
  async getTasksByProjectIdAndEmployeeIdAndStatus() {
    // const tasks = await this.getTasksByProjectIdAndEmployeeIdAndStatusUseCase.getInstance().getTasksByProjectIdAndStatus();

    return HttpResponse.send('Error with implementation', {});
  }

  @MessagePattern('getTasksByEmployeeId')
  async getTasksByEmployeeId(@Payload() data: { employeeId: string }) {
    try {
      const tasks = await this.getTasksByEmployeeIdUseCase
        .getInstance()
        .GetTasksByEmployeeId(data.employeeId);

      return HttpResponse.send('Tasks fetched', tasks);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('taskTest')
  async taskTest() {
    return HttpResponse.send('Task test', {});
  }
}
