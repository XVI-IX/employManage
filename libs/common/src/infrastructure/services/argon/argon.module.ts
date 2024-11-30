import { Module } from '@nestjs/common';
import { ArgonService } from './argon.service';

@Module({
  imports: [],
  exports: [ArgonService],
  providers: [ArgonService],
})
export class ArgonModule {}
