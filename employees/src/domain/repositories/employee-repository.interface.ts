import { EmployeeModel } from '../models';
import { IBaseRepository } from '../abstract';

export interface IEmployeeRepository extends IBaseRepository<EmployeeModel> {
  getEmployeeByName(name: string): Promise<EmployeeModel | null>;
}
