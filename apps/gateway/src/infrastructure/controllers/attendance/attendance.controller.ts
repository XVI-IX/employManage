import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/api/v1/attendance')
export class AttendanceGatewayController {
  constructor(
    @Inject('ATTENDANCE_SERVICE')
    private readonly attendanceService: ClientProxy,
  ) {}

  // @Post()
  // async createAttendance() {

  // }
}
