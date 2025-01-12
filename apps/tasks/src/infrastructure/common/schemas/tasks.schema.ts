import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskInput {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date | string;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date | string;

  @IsString()
  status: string;
}
