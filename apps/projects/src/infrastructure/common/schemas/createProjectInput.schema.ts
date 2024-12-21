import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProjectInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date | string;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date | string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  departmentId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  supervisorId: string;
}
