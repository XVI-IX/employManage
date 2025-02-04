import { Module } from '@nestjs/common';
import { AuthEmployeeController } from './controllers/employees/auth/authEmployee.controller';
import { EmployeeAccountController } from './controllers/employees/account/employeeAccount.controller';
import { DepartmentControllerGateway } from './controllers/departments/departments.controllers';
import { AttendanceGatewayController } from './controllers/attendance/attendance.controller';
import { ProjectsGatewayController } from './controllers/projects/projects.controller';
import { TasksGatewayController } from './controllers/tasks/tasks.controller';
import { NotificationGatewayController } from './controllers/notifications/notification.controller';
import { SseModule } from '@app/common/infrastructure/services/sse/sse.module';

@Module({
  imports: [SseModule],
  controllers: [
    AuthEmployeeController,
    EmployeeAccountController,
    DepartmentControllerGateway,
    AttendanceGatewayController,
    ProjectsGatewayController,
    TasksGatewayController,
    NotificationGatewayController,
  ],
})
export class ControllerModule {}
