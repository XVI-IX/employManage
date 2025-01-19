import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateNotificationInput {
  @IsBoolean()
  isRead: boolean;
}
