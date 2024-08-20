export class EmployeeModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  hireDate: Date;
  avatarUrl: string;
  password?: string;
  phone: string;
  departmentId?: string;
  role: string;
  jobTitle: string;
  createdAt: Date;
  updatedAt: Date;
}
