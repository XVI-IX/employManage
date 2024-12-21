import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { Module } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';

@Module({
  imports: [DatabaseModule],
  providers: [AttendanceRepository],
  exports: [AttendanceRepository],
})
export class AttendanceRepositoryModule {}
