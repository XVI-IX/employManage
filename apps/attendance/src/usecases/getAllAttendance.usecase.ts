import { IAttendanceRepository } from '../domain/repositories';

export class GetAllAttendanceUseCase {
  constructor(private readonly attendanceRepository: IAttendanceRepository) {}

  async getAllAttendance() {
    const response = await this.attendanceRepository.find({});

    return response;
  }
}
