import { NestFactory } from '@nestjs/core';
import { AttendanceModule } from './attendance.module';

async function bootstrap() {
  const app = await NestFactory.create(AttendanceModule);
  await app.listen(3000);
}
bootstrap();
