import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProjectInput } from '../common/schemas/createProjectInput.schema';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { CreateProjectUseCase } from '../../usecase/createProject.usecase';
import { ProjectsGeneralUseCaseProxy } from '../usecase-proxy/projectsGeneralUseCase.proxy';
import { HttpResponse } from '@app/common/infrastructure/helpers/response.helper';
import { GetAllProjectsUseCase } from '../../usecase/getAllProjects.usecase';
import { GetProjectByIdUseCase } from '../../usecase/getProjectById.usecase';
import { UpdateProjectUseCase } from '../../usecase/updateProject.usecase';

@Controller()
export class ProjectsController {
  constructor(
    @Inject(ProjectsGeneralUseCaseProxy.CREATE_PROJECT_USE_CASE_PROXY)
    private readonly createProjectUseCase: UseCaseProxy<CreateProjectUseCase>,
    @Inject(ProjectsGeneralUseCaseProxy.GET_ALL_PROJECTS_USE_CASE_PROXY)
    private readonly getAllProjectUseCase: UseCaseProxy<GetAllProjectsUseCase>,
    @Inject(
      ProjectsGeneralUseCaseProxy.GET_PROJECTS_BY_DEPARTMENT_ID_USE_CASE_PROXY,
    )
    private readonly getProjectByIdUseCase: UseCaseProxy<GetProjectByIdUseCase>,
    @Inject(ProjectsGeneralUseCaseProxy.UPDATE_PROJECT_USE_CASE_PROXY)
    private readonly updateProjectUseCase: UseCaseProxy<UpdateProjectUseCase>,
  ) {}

  @MessagePattern('createProject')
  async createProject(data: CreateProjectInput) {
    const response = await this.createProjectUseCase
      .getInstance()
      .createProject(data);

    return HttpResponse.send('Project created successfully', response);
  }

  @MessagePattern('getAllProjects')
  async getAllProjects() {
    const response = await this.getAllProjectUseCase
      .getInstance()
      .getAllProjects();

    return HttpResponse.send('Projects retrieved successfully', response);
  }

  @MessagePattern('getProjectById')
  async getProjectById(@Payload() data: { projectId: string }) {
    const response = await this.getProjectByIdUseCase
      .getInstance()
      .getProjectById(data.projectId);

    return HttpResponse.send('Project retrieved successfully', response);
  }

  @MessagePattern('updateProject')
  async updateProject(@Payload() data: { projectId: string; data: any }) {
    const response = await this.updateProjectUseCase
      .getInstance()
      .updateProject(data.projectId, data.data);

    return HttpResponse.send('Project updated successfully', response);
  }
}
