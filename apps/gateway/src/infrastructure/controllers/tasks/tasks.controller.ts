import { Public } from '@app/common/infrastructure/decorators';
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
    try {
      return this.taskService.send('createTask', data);
    } catch (error) {
      throw error;
    }
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
    try {
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
      } else if (query.status) {
        return this.taskService.send('getTasksByStatus', {
          status: query.status,
        });
      } else if (query.employeeId) {
        return this.taskService.send('getTasksByEmployeeId', {
          employeeId: query.employeeId,
        });
      } else {
        return this.taskService.send('getAllTasks', {});
      }
    } catch (error) {
      throw error;
    }
  }

  @Get('/:taskId')
  async getTaskById(@Param('taskId') taskId: string) {
    try {
      return this.taskService.send('getTaskById', { taskId });
    } catch (error) {
      throw error;
    }
  }

  @Get('/projects/:projectId')
  async getTaskByProjectId(@Param('projectId') projectId: string) {
    try {
      return this.taskService.send('getTaskByProjectId', { projectId });
    } catch (error) {
      throw error;
    }
  }

  @Put('/:taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() data: Partial<TasksModel>,
  ) {
    try {
      return this.taskService.send('updateTask', { taskId, data });
    } catch (error) {
      throw error;
    }
  }

  @Get('/test')
  @Public()
  async test() {
    return this.taskService.send('taskTest', {});
  }

  @Delete('/:taskId')
  async deleteTask(@Param('taskId') taskId: string) {
    try {
      return this.taskService.send('deleteTask', { taskId });
    } catch (error) {
      throw error;
    }
  }
}
