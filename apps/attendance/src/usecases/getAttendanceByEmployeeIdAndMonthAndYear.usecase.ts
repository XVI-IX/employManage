import { IAttendanceRepository } from '../domain/repositories';

export class GetAttendanceByEmployeeIdAndMonthAndYear {
  constructor(private readonly attendanceRepository: IAttendanceRepository) {}

  async getAttendanceByEmployeeIdAndMonthAndYear(
    employeeId: string,
    month: string,
    year: string,
  ) {
    const response =
      await this.attendanceRepository.getAttendanceByEmployeeIdAndMonthAndYear(
        employeeId,
        month,
        year,
      );

    return response;
  }
}
