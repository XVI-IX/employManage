import { IAttendanceRepository } from '../domain/repositories';

export class GetAttendanceByEmployeeIdAndYear {
  constructor(private readonly attendanceRepository: IAttendanceRepository) {}

  async getAttendanceByEmployeeIdAndYear(employeeId: string, year: string) {
    const response =
      await this.attendanceRepository.getAttendanceByEmployeeIdAndYear(
        employeeId,
        year,
      );

    return response;
  }
}
