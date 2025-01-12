import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TasksModel } from 'apps/tasks/src/domain/models/tasks.model';
import { CreateTaskInput } from 'apps/tasks/src/infrastructure/common/schemas/tasks.schema';

@Controller('/api/v1/tasks')
export class TasksGatewayController {
  constructor(
    @Inject('TASK_SERVICE') private readonly taskService: ClientProxy,
  ) {}

  @Post('/')
  async CreateTask(@Body() data: CreateTaskInput) {
    return this.taskService.send('createTask', data);
  }

  @Get('/')
  async GetAllTasks(
    @Query()
    query: {
      employeeId?: string;
      projectId?: string;
      status?: string;
    },
  ) {
    if (query.employeeId && query.projectId && query.status) {
      return this.taskService.send(
        'getTasksByProjectIdAndEmployeeIdAndStatus',
        {
          employeeId: query.employeeId,
          projectId: query.projectId,
          status: query.status,
        },
      );
    } else if (query.employeeId && query.projectId) {
      return this.taskService.send('getTasksByProjectIdAndEmployeeId', {
        employeeId: query.employeeId,
        projectId: query.projectId,
      });
    } else if (query.projectId && query.status) {
      return this.taskService.send('getTasksByProjectIdAndStatus', {
        projectId: query.projectId,
        status: query.status,
      });
    } else {
      return this.taskService.send('getAllTasks', {});
    }
  }

  @Get('/:taskId')
  async getTaskById(@Param('taskId') taskId: string) {
    return this.taskService.send('getTaskById', { taskId });
  }

  @Get('/projects/:projectId')
  async getTaskByProjectId(@Param('projectId') projectId: string) {
    return this.taskService.send('getTaskByProjectId', { projectId });
  }

  @Get('/employees/:employeeId')
  async getTasksByEmployeeId(@Param('employeeId') employeeId: string) {
    return this.taskService.send('getTasksByEmployeeId', { employeeId });
  }

  @Put('/:taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() data: Partial<TasksModel>,
  ) {
    return this.taskService.send('updateTask', { taskId, data });
  }

  @Delete('/:taskId')
  async deleteTask(@Param('taskId') taskId: string) {
    return this.taskService.send('deleteTask', { taskId });
  }
}
