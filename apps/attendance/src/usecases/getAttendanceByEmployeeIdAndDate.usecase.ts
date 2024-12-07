import { IAttendanceRepository } from '../domain/repositories';

export class GetAttendanceByEmployeeIdAndDateUseCase {
  constructor(private readonly attendanceRepository: IAttendanceRepository) {}

  async getAttendanceByEmployeeIdAndDate(employeeId: string, data: string) {
    const response =
      await this.attendanceRepository.getAttendanceByEmployeeIdAndDate(
        employeeId,
        data,
      );

    return response;
  }
}
