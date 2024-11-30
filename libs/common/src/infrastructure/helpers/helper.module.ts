import { Module } from '@nestjs/common';
import { TokenHelper } from './token/token.helper';

@Module({
  providers: [TokenHelper],
  exports: [TokenHelper],
})
export class HelperModule {}
