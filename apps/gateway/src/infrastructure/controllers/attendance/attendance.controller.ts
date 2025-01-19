import { Public } from '@app/common/infrastructure/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CheckOutInput,
  CreateAttendanceInput,
} from 'apps/attendance/src/infrastructure/common/schema/attendance.schema';

@Controller('/api/v1/attendance')
export class AttendanceGatewayController {
  constructor(
    @Inject('ATTENDANCE_SERVICE')
    private readonly attendanceService: ClientProxy,
  ) {}

  @Public()
  @Post('/')
  async createAttendance(@Body() data: CreateAttendanceInput) {
    try {
      return this.attendanceService.send('createAttendance', data);
    } catch (error) {
      throw error;
    }
  }

  @Get('/')
  async getAllAttendances() {
    try {
      return this.attendanceService.send('getAllAttendances', {});
    } catch (error) {
      throw error;
    }
  }

  @Get('/:attendanceId')
  async getAttendanceById(@Param('attendanceId') attendanceId: string) {
    try {
      return this.attendanceService.send('getAttendanceById', { attendanceId });
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Put('/')
  async updateAttendance(@Body() data: CheckOutInput) {
    try {
      return this.attendanceService.send('checkout', {
        employeeId: data.employeeId,
        ...data,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get('/all/date-range')
  async getAttendanceByDateRange(
    @Query() qObj: { start?: string; end?: string },
  ) {
    try {
      console.log(qObj);
      return this.attendanceService.send('getAttendanceByDateRange', qObj);
    } catch (error) {
      throw error;
    }
  }

  @Get('/employees/:employeeId')
  async getEmployeeAttendance(
    @Query()
    qObj: {
      date?: string;
      month?: string;
      year?: string;
    },
    @Param('employeeId') employeeId: string,
  ) {
    try {
      if (qObj?.date) {
        return this.attendanceService.send('getAttendanceByEmployeeIdAndDate', {
          employeeId,
          date: qObj.date,
        });
      } else if (qObj?.month && qObj.year) {
        return this.attendanceService.send(
          'getAttendanceByEmployeeIdAndMonthAndYear',
          {
            employeeId,
            month: qObj.month,
            year: qObj.year,
          },
        );
      } else if (qObj?.month) {
        return this.attendanceService.send(
          'getAttendanceByEmployeeIdAndMonth',
          {
            employeeId,
            month: qObj.month,
          },
        );
      } else {
        return this.attendanceService.send('getAttendanceByEmployeeId', {
          employeeId,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:attendanceId')
  async deleteAttendance(@Param('attendanceId') attendanceId: string) {
    try {
      return this.attendanceService.send('deleteAttendance', { attendanceId });
    } catch (error) {
      throw error;
    }
  }
}
