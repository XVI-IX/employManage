export class EmployeeModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  hireDate: Date | string;
  avatarUrl?: string;
  password?: string;
  phone: string;
  departmentId?: string;
  resetPasswordToken?: string;
  refreshToken?: string;
  resetPasswordExpires?: Date | string;
  role: string;
  jobTitle: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
