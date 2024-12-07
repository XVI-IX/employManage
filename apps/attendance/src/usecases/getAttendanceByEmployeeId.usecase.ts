import { IAttendanceRepository } from '../domain/repositories';

export class GetAttendanceByEmployeeIdUseCase {
  constructor(private readonly attendanceRepository: IAttendanceRepository) {}

  async getAttendanceByEmployeeId(employeeId: string) {
    const response =
      await this.attendanceRepository.getAttendanceByEmployeeId(employeeId);

    return response;
  }
}
