import { NestFactory } from '@nestjs/core';
import { AttendanceModule } from './attendance.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envConfig } from '@app/common/infrastructure/config/environment.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AttendanceModule,
    {
      transport: Transport.TCP,
      options: {
        host: envConfig.getMicroServicesHost(),
        port: envConfig.getProjectServicePort(),
      },
    },
  );
  await app.listen();
}
bootstrap();
