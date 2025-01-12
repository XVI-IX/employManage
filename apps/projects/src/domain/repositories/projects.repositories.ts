import { IBaseRepository } from '@app/common/domain/repositories';
import { ProjectAssigneesModel, ProjectModel } from '../model';

export interface IProjectRepository
  extends IBaseRepository<
    | ProjectModel
    | ProjectAssigneesModel[]
    | ProjectModel[]
    | ProjectAssigneesModel
  > {
  getProjectsByDepartmentId(departmentId: string): Promise<ProjectModel[]>;
  addProjectAssignee(
    projectId: string,
    assignee: string,
  ): Promise<ProjectAssigneesModel>;
  removeProjectAssignee(
    projectId: string,
    assignee: string,
  ): Promise<ProjectAssigneesModel>;
  getAllProjectAssignees(projectId: string): Promise<ProjectAssigneesModel[]>;
  getAllDueProjects(): Promise<ProjectModel[]>;
  getAllPendingProjects(): Promise<ProjectModel[]>;
  getAllCompletedProjects(): Promise<ProjectModel[]>;
  getAllSupervisorProjects(supervisorId: string): Promise<ProjectModel[]>;
}
