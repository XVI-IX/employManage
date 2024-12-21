import { v4 } from 'uuid';
import { IAttendanceRepository } from '../domain/repositories';
import { CreateAttendanceInput } from '../infrastructure/common/schema/attendance.schema';
import * as moment from 'moment';
import { BadRequestException } from '@nestjs/common';

export class CreateAttendanceUseCase {
  constructor(private readonly attendanceRepository: IAttendanceRepository) {}

  async createAttendance(data: CreateAttendanceInput) {
    const attendanceData = {
      id: v4(),
      ...data,
      date: moment().format('YYYY-MM-DD'),
    };

    const checkAttendance = await this.attendanceRepository.findOne({
      where: {
        employeeId: attendanceData.employeeId,
        date: moment().format('YYYY-MM-DD'),
      },
    });

    if (checkAttendance) {
      throw new BadRequestException('Employee has already checked in');
    }

    const result = await this.attendanceRepository.save(attendanceData);

    return result;
  }
}
