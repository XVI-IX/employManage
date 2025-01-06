import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
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
    return this.projectsService.send('createProject', data);
  }

  @Get('/')
  async getAllProjects() {
    return this.projectsService.send('getAllProjects', {});
  }

  @Get('/:projectId')
  async getProjectById(@Param('projectId') projectId: string) {
    return this.projectsService.send('getProjectById', { projectId });
  }

  @Put('/:projectId')
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() data: Partial<ProjectModel>,
  ) {
    return this.projectsService.send('updateProject', {
      projectId,
      data,
    });
  }
}
