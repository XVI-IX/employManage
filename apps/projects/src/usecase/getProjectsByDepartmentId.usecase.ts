import { IProjectRepository } from '../domain/repositories';

export class GetProjectsByDepartmentIdUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async getProjectsByDepartmentId(departmentId: string) {
    return await this.projectRepository.getProjectsByDepartmentId(departmentId);
  }
}
