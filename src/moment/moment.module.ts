import { Module } from '@nestjs/common';
import { MomentService } from './moment.service';

@Module({
  providers: [MomentService],
  exports: [MomentService],
})
export class MomentModule {}
