import { IBaseRepository } from '@app/common/domain/repositories';
import { EmployeeModel } from '../model';

/**
 * Employee repository interface
 * @interface IEmployeeRepository - Employee repository interface
 * @extends {IBaseRepository<EmployeeModel>} - Extends IBaseRepository<>
 */
export interface IEmployeeRepository extends IBaseRepository<EmployeeModel> {
  getEmployeeByEmail(email: string): Promise<EmployeeModel | null>;
}
