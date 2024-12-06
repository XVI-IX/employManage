import { IDepartmentRepository } from '../domain/repositories';

export class DeleteDepartmentUseCase {
  constructor(private readonly departmentRepository: IDepartmentRepository) {}

  async deleteDepartment(departmentId: string): Promise<boolean> {
    const department = await this.departmentRepository.findOne({
      where: {
        id: departmentId,
      },
    });

    if (!department) {
      return false;
    }

    const deletedDepartment =
      await this.departmentRepository.delete(departmentId);

    if (!deletedDepartment) {
      return false;
    }

    return true;
  }
}
