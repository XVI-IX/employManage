import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { DatabaseService } from '@app/common/infrastructure/services/database/database.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthEmployeeController } from './infrastructure/controllers/employees/auth/authEmployee.controller';
import { EmployeeAccountController } from './infrastructure/controllers/employees/account/employeeAccount.controller';

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
        name: 'PROJECT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3005,
        },
      },
    ]),
  ],
  controllers: [AuthEmployeeController, EmployeeAccountController],
  providers: [GatewayService, DatabaseService],
  exports: [],
})
export class GatewayModule {}
