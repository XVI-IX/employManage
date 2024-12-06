import { IBaseRepository } from '@app/common/domain/repositories';
import { DepartmentModel } from '../models/department.model';

export interface IDepartmentRepository
  extends IBaseRepository<DepartmentModel> {}
