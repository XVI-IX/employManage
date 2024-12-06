import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
})
export class AttendanceRepositoryModule {}
