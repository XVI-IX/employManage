import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { DatabaseService } from '@app/common/infrastructure/services/database/database.service';

@Module({
  imports: [],
  controllers: [GatewayController],
  providers: [GatewayService, DatabaseService],
})
export class GatewayModule {}
