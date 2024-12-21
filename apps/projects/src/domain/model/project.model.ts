export class ProjectModel {
  id?: string;
  name?: string;
  description?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  departmentId?: string;
  supervisorId?: string;
  status?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export class ProjectAssigneesModel {
  id?: string;
  projectId?: string;
  employeeId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
