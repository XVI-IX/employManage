import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  parentId?: string;
}

export class UpdateDepartmentInput {
  @IsString()
  name: string;
}
