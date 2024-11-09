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
  hireDate: Date;

  @IsString()
  phone: string;

  jobTitle: string;

  createdAt: Date;

  updatedAt: Date;
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
