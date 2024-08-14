import { NestFactory } from '@nestjs/core';
import { DepartmentsModule } from './departments.module';

async function bootstrap() {
  const app = await NestFactory.create(DepartmentsModule);
  await app.listen(3000);
}
bootstrap();
