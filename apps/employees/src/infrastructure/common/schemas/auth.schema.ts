import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
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

export class ForgotPasswordInput {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPasswordInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  token: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
