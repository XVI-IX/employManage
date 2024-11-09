import { IsDate, IsString, IsUUID } from 'class-validator';

export class Employee {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  avatarUrl: string;

  @IsDate()
  hireDate: Date;

  @IsString()
  phone: string;

  jobTitle: string;

  createdAt: Date;

  updatedAt: Date;
}
