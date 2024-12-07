import { IAttendanceRepository } from '../domain/repositories';

export class DeleteAttendanceUseCase {
  constructor(private attendanceRepository: IAttendanceRepository) {}

  async deleteRepository(id: string) {
    const response = await this.attendanceRepository.delete(id);

    return response;
  }
}
