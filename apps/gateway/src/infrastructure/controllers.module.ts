import { Module } from '@nestjs/common';
import { AuthEmployeeController } from './controllers/employees/auth/authEmployee.controller';
import { EmployeeAccountController } from './controllers/employees/account/employeeAccount.controller';

@Module({
  imports: [],
  controllers: [AuthEmployeeController, EmployeeAccountController],
})
export class ControllerModule {}
