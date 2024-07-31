export interface IRegisterUserInput {
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  position: string;
  salary?: number;
}