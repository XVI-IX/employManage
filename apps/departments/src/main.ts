import { NestFactory } from '@nestjs/core';
import { DepartmentsModule } from './departments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envConfig } from '@app/common/infrastructure/config/environment.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DepartmentsModule,
    {
      transport: Transport.TCP,
      options: {
        port: envConfig.getDepartmentServicePort(),
      },
    },
  );

  await app.listen();
}
bootstrap();
