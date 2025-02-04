import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envConfig } from '@app/common/infrastructure/config/environment.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationsModule,
    {
      transport: Transport.TCP,
      options: {
        host: envConfig.getMicroServicesHost(),
        port: envConfig.getNotifcationServicePort(),
      },
      logger: ['error', 'warn', 'log'],
    },
  );

  await app.listen();
}
bootstrap();
