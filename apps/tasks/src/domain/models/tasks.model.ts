export class TasksModel {
  id: string;
  projectId?: string;
  employeeId?: string;
  name?: string;
  description?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  status?: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}
