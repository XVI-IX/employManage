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
import { ProjectModel } from 'apps/projects/src/domain/model';
import { CreateProjectInput } from 'apps/projects/src/infrastructure/common/schemas/createProjectInput.schema';

@Controller('api/v1/projects')
export class ProjectsGatewayController {
  constructor(
    @Inject('PROJECTS_SERVICE') private readonly projectsService: ClientProxy,
  ) {}

  @Post('/')
  async createProject(@Body() data: CreateProjectInput) {
    try {
      return this.projectsService.send('createProject', data);
    } catch (error) {
      throw error;
    }
  }

  @Get('/')
  async getAllProjects(
    @Query() query: { completed: boolean; pending: boolean; due: boolean },
  ) {
    try {
      if (query.completed) {
        return this.projectsService.send('getCompletedProjects', {});
      } else if (query.pending) {
        return this.projectsService.send('getPendingProjects', {});
      } else if (query.due) {
        return this.projectsService.send('getDueProjects', {});
      } else {
        return this.projectsService.send('getAllProjects', {});
      }
    } catch (error) {
      throw error;
    }
  }

  @Get('/:projectId')
  async getProjectById(@Param('projectId') projectId: string) {
    try {
      return this.projectsService.send('getProjectById', { projectId });
    } catch (error) {
      throw error;
    }
  }

  @Put('/:projectId')
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() data: Partial<ProjectModel>,
  ) {
    try {
      return this.projectsService.send('updateProject', {
        projectId,
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get('/departments/:departmentId')
  async getProjectsByDepartmentId(@Param('departmentId') departmentId: string) {
    try {
      return this.projectsService.send('getProjectsByDepartmentId', {
        departmentId,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get('/supervisors/:supervisorId')
  async getSupervisorProjects(@Param('supervisorId') supervisorId: string) {
    try {
      return this.projectsService.send('getSupervisorProjects', {
        supervisorId,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get('/:projectId/assignees')
  async getAllProjectAssignees(@Param('projectId') projectId: string) {
    try {
      return this.projectsService.send('getAllProjectAssignees', { projectId });
    } catch (error) {
      throw error;
    }
  }

  @Put('/:projectId/assignees/:assigneeId')
  async addProjectAssignee(
    @Param('projectId') projectId: string,
    @Param('assigneeId') assigneeId: string,
  ) {
    try {
      return this.projectsService.send('addProjectAssignee', {
        projectId,
        assigneeId,
      });
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:projectId/assignees/:assigneeId')
  async removeProjectAssignee(
    @Param('projectId') projectId: string,
    @Param('assigneeId') assigneeId: string,
  ) {
    try {
      return this.projectsService.send('removeProjectAssignee', {
        projectId,
        assigneeId,
      });
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:projectId')
  async deleteProject(@Param('projectId') projectId: string) {
    try {
      return this.projectsService.send('deleteProject', {
        projectId,
      });
    } catch (error) {
      throw error;
    }
  }
}
