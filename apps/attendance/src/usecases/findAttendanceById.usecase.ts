import { AttendanceModel } from '../domain/models';
import { IAttendanceRepository } from '../domain/repositories';

export class FindAttendanceByIdUseCase {
  constructor(private readonly attendanceRepository: IAttendanceRepository) {}

  async findById(id: string): Promise<AttendanceModel> {
    const response = await this.attendanceRepository.findOne({
      where: {
        id,
      },
    });

    return response;
  }
}
