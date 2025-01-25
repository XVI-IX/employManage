import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { DatabaseService } from '@app/common/infrastructure/services/database/database.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthEmployeeController } from './infrastructure/controllers/employees/auth/authEmployee.controller';
import { EmployeeAccountController } from './infrastructure/controllers/employees/account/employeeAccount.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/common/infrastructure/guards/auth.guard';
import { JwtTokenModule } from '@app/common/infrastructure/services/jwt/jwt.module';
import { DepartmentControllerGateway } from './infrastructure/controllers/departments/departments.controllers';
import { AttendanceGatewayController } from './infrastructure/controllers/attendance/attendance.controller';
import { ProjectsGatewayController } from './infrastructure/controllers/projects/projects.controller';
import { TasksGatewayController } from './infrastructure/controllers/tasks/tasks.controller';
import { NotificationGatewayController } from './infrastructure/controllers/notifications/notification.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMPLOYEE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
      {
        name: 'DEPARTMENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3003,
        },
      },
      {
        name: 'ATTENDANCE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3004,
        },
      },
      {
        name: 'PROJECTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3005,
        },
      },
      {
        name: 'TASK_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3006,
        },
      },
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3007,
        },
      },
    ]),
    JwtTokenModule,
  ],
  controllers: [
    AuthEmployeeController,
    EmployeeAccountController,
    DepartmentControllerGateway,
    AttendanceGatewayController,
    ProjectsGatewayController,
    TasksGatewayController,
    NotificationGatewayController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    GatewayService,
    DatabaseService,
  ],
  exports: [],
})
export class GatewayModule {}
