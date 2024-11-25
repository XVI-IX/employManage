import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

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
  hireDate: Date | string;

  @IsString()
  phone: string;

  jobTitle: string;

  createdAt: Date | string;

  updatedAt: Date | string;
}

export class UpdateEmployeeInput {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  avatarUrl: string;

  @IsString()
  @IsOptional()
  jobTitle: string;
}
