import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateProjectInput } from '../common/schemas/createProjectInput.schema';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { CreateProjectUseCase } from '../../usecase/createProject.usecase';
import { ProjectsGeneralUseCaseProxy } from '../usecase-proxy/projectsGeneralUseCase.proxy';
import { HttpResponse } from '@app/common/infrastructure/helpers/response.helper';

@Controller()
export class ProjectsController {
  constructor(
    @Inject(ProjectsGeneralUseCaseProxy.CREATE_PROJECT_USE_CASE_PROXY)
    private readonly createProjectUseCase: UseCaseProxy<CreateProjectUseCase>,
  ) {}

  @MessagePattern('createProject')
  async createProject(data: CreateProjectInput) {
    const response = await this.createProjectUseCase
      .getInstance()
      .createProject(data);

    return HttpResponse.send('Project created successfully', response);
  }
}
