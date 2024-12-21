import { IBaseRepository } from '@app/common/domain/repositories';
import { ProjectModel } from '../model';

export interface IProjectRepository extends IBaseRepository<ProjectModel> {
  getProjectsByDepartmentId(departmentId: string): Promise<ProjectModel>;
  getAllProjectAssignees(projectId: string): Promise<ProjectModel>;
  getAllDueProjects(): Promise<ProjectModel>;
  getAllPendingProjects(): Promise<ProjectModel>;
  getAllCompletedProjects(): Promise<ProjectModel>;
  getAllSupervisorProjects(supervisorId: string): Promise<ProjectModel>;
}
