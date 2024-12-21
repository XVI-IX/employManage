import * as moment from 'moment';
import { AttendanceModel } from '../domain/models';
import { IAttendanceRepository } from '../domain/repositories';
import { BadRequestException } from '@nestjs/common';

export class UpdateAttendanceUseCase {
  constructor(private readonly attendanceRepository: IAttendanceRepository) {}

  async updateAttendance(employeeId: string, data: Partial<AttendanceModel>) {
    const response = await this.attendanceRepository.update(employeeId, {
      checkOut: moment().format('HH:mm:ss'),
      date: moment().format('YYYY-MM-DD'),
    });

    if (!response) {
      throw new BadRequestException('Employee has not checked in');
    }

    return response;
  }
}
