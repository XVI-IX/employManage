import { IBase } from '@app/common/domain/adapters';

export interface IEmployee extends IBase {
  userName: string;
  email: string;
  phoneNumber: string;
  googleId: string;
  role: string;
  verified: boolean;
  verificationToken?: string;
  resetToken?: string;
  departmentId?: string;
  notifications: any[];
  projects: any[];
}

export interface IEmployeeResponse {
  status?: boolean;
  message?: string | null;
  data?: IEmployee | IEmployee[];
  page?: number;
}
