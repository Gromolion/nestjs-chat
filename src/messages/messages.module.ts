import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MomentModule } from '../moment/moment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), MomentModule],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
