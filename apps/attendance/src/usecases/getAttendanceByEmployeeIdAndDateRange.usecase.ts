import { AttendanceRepository } from '../infrastructure/repositories/attendance.repository';

export class GetAttendanceByEmployeeIdAndDateRangeUseCase {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  async getAttendanceByEmployeeIdAndDateRange(
    employeeId: string,
    start: string,
    end: string,
  ) {
    return this.attendanceRepository.getAttendanceByEmployeeIdAndDateRange(
      employeeId,
      start,
      end,
    );
  }
}
