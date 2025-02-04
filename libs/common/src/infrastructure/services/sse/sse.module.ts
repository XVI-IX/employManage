import { Module } from '@nestjs/common';
import { SseService } from './sse.service';

@Module({
  imports: [],
  providers: [SseService],
  exports: [SseService],
})
export class SseModule {}
