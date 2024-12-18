import { AttendanceRepository } from '../infrastructure/repositories/attendance.repository';

export class GetAttendanceByDateRangeUseCase {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  async getAttendanceByDateRange(start: string, end: string) {
    return this.attendanceRepository.getAttendanceByDateRange(start, end);
  }
}
