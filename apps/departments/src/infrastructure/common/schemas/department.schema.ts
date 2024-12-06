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
  @IsOptional()
  id: string;

  @IsString()
  name: string;
}
