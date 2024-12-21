import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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
}
