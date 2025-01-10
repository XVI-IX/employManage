import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { envConfig } from '@app/common/infrastructure/config/environment.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TasksModule,
    {
      transport: 'TCP',
      options: {
        host: envConfig.getMicroServicesHost(),
        port: envConfig.getTaskServicePort(),
      },
    },
  );
  await app.listen();
}
bootstrap();
