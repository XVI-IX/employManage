import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const httpApp = await NestFactory.create<INestApplication>(GatewayModule);
  await httpApp.listen(3000);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GatewayModule,
    {
      transport: Transport.TCP,
      options: {
        port: 4000,
      },
    },
  );

  await app.listen();
}
bootstrap();
