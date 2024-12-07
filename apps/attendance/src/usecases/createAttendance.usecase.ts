import { v4 } from 'uuid';
import { IAttendanceRepository } from '../domain/repositories';
import { CreateAttendanceInput } from '../infrastructure/common/schema/attendance.schema';

export class CreateAttendanceUseCase {
  constructor(private readonly attendanceRepository: IAttendanceRepository) {}

  async createAttendance(data: CreateAttendanceInput) {
    const attendanceData = {
      id: v4(),
      ...data,
    };

    const result = await this.attendanceRepository.save(attendanceData);

    return result;
  }
}
