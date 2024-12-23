import { Module } from '@nestjs/common';
import { AuthEmployeeController } from './controllers/employees/auth/authEmployee.controller';
import { EmployeeAccountController } from './controllers/employees/account/employeeAccount.controller';
import { DepartmentControllerGateway } from './controllers/departments/departments.controllers';
import { AttendanceGatewayController } from './controllers/attendance/attendance.controller';
import { ProjectsGatewayController } from './controllers/projects/projects.controller';

@Module({
  imports: [],
  controllers: [
    AuthEmployeeController,
    EmployeeAccountController,
    DepartmentControllerGateway,
    AttendanceGatewayController,
    ProjectsGatewayController,
  ],
})
export class ControllerModule {}
