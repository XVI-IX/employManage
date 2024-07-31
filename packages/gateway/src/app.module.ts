import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { AuthModule } from './auth/auth.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['ampq://localhost:5672'],
          queue: 'auth_queue',
        },
      },
      {
        name: 'EMPLOYEE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['ampq://localhost:5672'],
          queue: 'employee_queue',
        },
      },
      {
        name: 'PROJECTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['ampq://localhost:5672'],
          queue: 'projects_queue',
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
