import { IBaseRepository } from '@app/common/domain/repositories';
import { TasksModel } from '../models/tasks.model';

export interface ITaskRepository extends IBaseRepository<TasksModel> {
  findTasksByProjectId(projectId: string): Promise<TasksModel[]>;
  findTasksByEmployeeId(employeeId: string): Promise<TasksModel[]>;
  findTasksByProjectIdAndEmployeeId(
    projectId: string,
    employeeId: string,
  ): Promise<TasksModel[]>;
  findTasksByStatus(status: string): Promise<TasksModel[]>;
  findTasksByProjectIdAndStatus(
    projectId: string,
    status: string,
  ): Promise<TasksModel[]>;
  findTasksByEmployeeIdAndStatus(
    employeeId: string,
    status: string,
  ): Promise<TasksModel[]>;
  findTasksByProjectIdAndEmployeeIdAndStatus(
    projectId: string,
    employeeId: string,
    status: string,
  ): Promise<TasksModel[]>;
  findTasksByProjectIdAndEmployeeIdAndStatusAndDate(
    projectId: string,
    employeeId: string,
    status: string,
    date: Date,
  ): Promise<TasksModel[]>;
  findTasksByProjectIdAndEmployeeIdAndStatusAndDateRange(
    projectId: string,
    employeeId: string,
    status: string,
    startDate: Date,
    endDate: Date,
  ): Promise<TasksModel[]>;
  findTasksByProjectIdAndEmployeeIdAndStatusAndDateRangeAndName(
    projectId: string,
    employeeId: string,
    status: string,
    startDate: Date,
    endDate: Date,
    name: string,
  ): Promise<TasksModel[]>;
  findTasksByProjectIdAndEmployeeIdAndStatusAndDateRangeAndNameAndDescription(
    projectId: string,
    employeeId: string,
    status: string,
    startDate: Date,
    endDate: Date,
    name: string,
    description: string,
  ): Promise<TasksModel[]>;
  findTasksByProjectIdAndEmployeeIdAndStatusAndDateRangeAndNameAndDescriptionAndCreatedAt(
    projectId: string,
    employeeId: string,
    status: string,
    startDate: Date,
    endDate: Date,
    name: string,
    description: string,
    createdAt: Date,
  ): Promise<TasksModel[]>;
  findTasksByProjectIdAndEmployeeIdAndStatusAndDateRangeAndNameAndDescriptionAndCreatedAtAndUpdatedAt(
    projectId: string,
    employeeId: string,
    status: string,
    startDate: Date,
    endDate: Date,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
  ): Promise<TasksModel[]>;
}
