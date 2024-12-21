import { AttendanceModel } from '../domain/models';
import { IAttendanceRepository } from '../domain/repositories';

export class GetAllAttendanceUseCase {
  constructor(private readonly attendanceRepository: IAttendanceRepository) {}

  async getAllAttendance(): Promise<AttendanceModel[]> {
    const response = await this.attendanceRepository.find({});

    return response;
  }
}
