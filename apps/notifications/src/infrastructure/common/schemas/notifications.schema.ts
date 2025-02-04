import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationInput {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateNotificationInput {
  @IsString()
  notificationId: string;

  @IsBoolean()
  isRead: boolean;
}
