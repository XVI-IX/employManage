import { NestFactory } from '@nestjs/core';
import { envConfig } from '@app/common/infrastructure/config/environment.config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envConfig.getEmployeeServicePort() || 3001,
      },
    },
  );
  await app.listen();
}
bootstrap();
