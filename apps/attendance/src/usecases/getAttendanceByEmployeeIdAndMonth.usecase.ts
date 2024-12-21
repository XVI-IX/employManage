import { IAttendanceRepository } from '../domain/repositories';

export class GetAttendanceByEmployeeIdAndMonth {
  constructor(private readonly attendanceRepository: IAttendanceRepository) {}

  async getAttendanceByEmployeeIdAndMonth(employeeId: string, month: string) {
    const response =
      await this.attendanceRepository.getAttendanceByEmployeeIdAndMonth(
        employeeId,
        month,
      );

    return response;
  }
}
