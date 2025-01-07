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
import { GetProjectsByDepartmentIdUseCase } from '../../usecase/getProjectsByDepartmentId.usecase';
import { GetAllSupervisorProjectsUseCase } from '../../usecase/getAllSupervisorProjects.usecase';
import { DeleteProjectUseCase } from '../../usecase/deleteProject.usecase';
import { getAllCompletedProjectsUseCase } from '../../usecase/getAllCompletedProjects.usecase';
import { GetAllPendingProjectsUseCase } from '../../usecase/getAllPendingProjects.usecase';
import { GetAllDueProjectsUseCase } from '../../usecase/getAllDueProjects.usecase';
import { GetAllProjectAssigneesUseCase } from '../../usecase/getAllProjectAssignees.usecase';
import { AddProjectAssigneeUseCase } from '../../usecase/addProjectAssignee.usecase';
import { RemoveProjectAssigneeUseCase } from '../../usecase/deleteProjectAssignee.usecase';

@Controller()
export class ProjectsController {
  constructor(
    @Inject(ProjectsGeneralUseCaseProxy.CREATE_PROJECT_USE_CASE_PROXY)
    private readonly createProjectUseCase: UseCaseProxy<CreateProjectUseCase>,
    @Inject(ProjectsGeneralUseCaseProxy.GET_ALL_PROJECTS_USE_CASE_PROXY)
    private readonly getAllProjectUseCase: UseCaseProxy<GetAllProjectsUseCase>,
    @Inject(ProjectsGeneralUseCaseProxy.GET_PROJECT_BY_ID_USE_CASE_PROXY)
    private readonly getProjectByIdUseCase: UseCaseProxy<GetProjectByIdUseCase>,
    @Inject(ProjectsGeneralUseCaseProxy.UPDATE_PROJECT_USE_CASE_PROXY)
    private readonly updateProjectUseCase: UseCaseProxy<UpdateProjectUseCase>,
    @Inject(
      ProjectsGeneralUseCaseProxy.GET_PROJECTS_BY_DEPARTMENT_ID_USE_CASE_PROXY,
    )
    private readonly getProjectsByDepartmentIdUseCase: UseCaseProxy<GetProjectsByDepartmentIdUseCase>,
    @Inject(
      ProjectsGeneralUseCaseProxy.GET_ALL_SUPERVISOR_PROJECTS_USE_CASE_PROXY,
    )
    private readonly getAllSupervisorProjectsUseCase: UseCaseProxy<GetAllSupervisorProjectsUseCase>,
    @Inject(ProjectsGeneralUseCaseProxy.DELETE_PROJECT_USE_CASE_PROXY)
    private readonly deleteProjectUseCase: UseCaseProxy<DeleteProjectUseCase>,
    @Inject(
      ProjectsGeneralUseCaseProxy.GET_ALL_COMPLETED_PROJECTS_USE_CASE_PROXY,
    )
    private readonly getAllCompletedProjectsUseCase: UseCaseProxy<getAllCompletedProjectsUseCase>,
    @Inject(ProjectsGeneralUseCaseProxy.GET_ALL_PENDING_PROJECTS_USE_CASE_PROXY)
    private readonly getAllPendingProjectsUseCase: UseCaseProxy<GetAllPendingProjectsUseCase>,
    @Inject(ProjectsGeneralUseCaseProxy.GET_ALL_DUE_PROJECTS_USE_CASE_PROXY)
    private readonly getAllDueProjectsUseCase: UseCaseProxy<GetAllDueProjectsUseCase>,
    @Inject(
      ProjectsGeneralUseCaseProxy.GET_ALL_PROJECT_ASSIGNEES_USE_CASE_PROXY,
    )
    private readonly getAllProjectAssigneesUseCase: UseCaseProxy<GetAllProjectAssigneesUseCase>,
    @Inject(ProjectsGeneralUseCaseProxy.ADD_PROJECT_ASSIGNEE_USE_CASE_PROXY)
    private readonly addProjectAssigneeUseCase: UseCaseProxy<AddProjectAssigneeUseCase>,
    @Inject(ProjectsGeneralUseCaseProxy.REMOVE_PROJECT_ASSIGNEE_USE_CASE_PROXY)
    private readonly removeProjectAssigneeUseCase: UseCaseProxy<RemoveProjectAssigneeUseCase>,
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

  @MessagePattern('getProjectsByDepartmentId')
  async getProjectsByDepartmentId(@Payload() data: { departmentId: string }) {
    const response = await this.getProjectsByDepartmentIdUseCase
      .getInstance()
      .getProjectsByDepartmentId(data.departmentId);

    return HttpResponse.send('Projects retrieved successfully', response);
  }

  @MessagePattern('getSupervisorProjects')
  async getSupervisorProjects(@Payload() data: { supervisorId: string }) {
    const response = await this.getAllSupervisorProjectsUseCase
      .getInstance()
      .getAllSupervisorProjects(data.supervisorId);

    return HttpResponse.send('Projects retrieved successfully', response);
  }

  @MessagePattern('getCompletedProjects')
  async getCompletedProjects() {
    const response = await this.getAllCompletedProjectsUseCase
      .getInstance()
      .getAllCompletedProjects();

    return HttpResponse.send('Projects retrieved successfully', response);
  }

  @MessagePattern('getPendingProjects')
  async getPendingProjects() {
    const response = await this.getAllPendingProjectsUseCase
      .getInstance()
      .getAllPendingProjects();

    return HttpResponse.send('Projects retrieved successfully', response);
  }

  @MessagePattern('getDueProjects')
  async getDueProjects() {
    const response = await this.getAllDueProjectsUseCase
      .getInstance()
      .getAllDueProjects();

    return HttpResponse.send('Projects retrieved successfully', response);
  }

  @MessagePattern('addProjectAssignee')
  async addProjectAssignee(
    @Payload() data: { projectId: string; assigneeId: string },
  ) {
    const response = await this.addProjectAssigneeUseCase
      .getInstance()
      .addProjectAssignee(data.projectId, data.assigneeId);

    return HttpResponse.send('Assignee added successfully', response);
  }

  @MessagePattern('getAllProjectAssignees')
  async getAllProjectAssignees(@Payload() data: { projectId: string }) {
    const response = await this.getAllProjectAssigneesUseCase
      .getInstance()
      .getAllProjectAssignees(data.projectId);

    return HttpResponse.send(
      'Project assignees retrieved successfully',
      response,
    );
  }

  @MessagePattern('deleteProject')
  async deleteProject(@Payload() data: { projectId: string }) {
    const response = await this.deleteProjectUseCase
      .getInstance()
      .deleteProject(data.projectId);

    return HttpResponse.send('Project deleted successfully', response);
  }
}
