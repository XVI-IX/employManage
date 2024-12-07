import { AttendanceModel } from '../domain/models';
import { IAttendanceRepository } from '../domain/repositories';

export class UpdateAttendanceUseCase {
  constructor(private readonly attendanceRepository: IAttendanceRepository) {}

  async updateAttendance(employeeId: string, data: Partial<AttendanceModel>) {
    const response = await this.attendanceRepository.update(employeeId, data);

    return response;
  }
}
