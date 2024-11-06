import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class RegisterEmployeeInput {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  hireDate: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsUrl()
  avatarUrl?: string;
}

export class LoginEmployeePasswordInput {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
