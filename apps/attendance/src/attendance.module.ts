import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { AttendanceRepositoryModule } from './infrastructure/repositories/attendance.repository.module';
import { AttendanceGeneralUseCaseProxyModule } from './infrastructure/usecase-proxy/attendance-general.usecase.proxy';
import { AttendanceController } from './infrastructure/controllers/attendance.controller';
import { AttendanceService } from './attendance.service';

@Module({
  imports: [
    DatabaseModule,
    AttendanceRepositoryModule,
    AttendanceGeneralUseCaseProxyModule.register(),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
