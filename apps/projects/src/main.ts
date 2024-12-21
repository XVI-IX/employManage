import { NestFactory } from '@nestjs/core';
import { ProjectsModule } from './projects.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envConfig } from '@app/common/infrastructure/config/environment.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProjectsModule,
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
