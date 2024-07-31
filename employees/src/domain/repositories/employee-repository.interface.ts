import { IBaseRepository } from '../abstract/base-repository.interface';
import { EmployeeModel } from '../models';

export interface IEmployeeRepository extends IBaseRepository<EmployeeModel> {
  getEmployeeByName(name: string): Promise<EmployeeModel | null>;
}
