import { Module } from '@nestjs/common';
import { AuthEmployeeController } from './controllers/employees/auth/authEmployee.controller';
import { EmployeeAccountController } from './controllers/employees/account/employeeAccount.controller';
import { DepartmentControllerGateway } from './controllers/departments/departments.controllers';

@Module({
  imports: [],
  controllers: [
    AuthEmployeeController,
    EmployeeAccountController,
    DepartmentControllerGateway,
  ],
})
export class ControllerModule {}
