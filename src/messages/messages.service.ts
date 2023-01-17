import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import MessageDto from './dto/message.dto';
import { User } from '../users/entities/user.entity';
import { MomentService } from '../moment/moment.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    private readonly momentService: MomentService,
  ) {}

  async findAllWithParents() {
    return await this.messagesRepository.find({
      relations: {
        parent: true,
      },
    });
  }

  async findById(id: number) {
    return await this.messagesRepository.findOneBy({ id: id });
  }

  async save(message: Message) {
    await this.messagesRepository.save(message);
  }

  async create(user: User, messageDto: MessageDto) {
    const time = this.momentService.getMoment().format('LT');

    const parentId = messageDto.parent;
    let parentMessage;

    if (parentId) parentMessage = await this.findById(parentId);

    return new Message(user, messageDto.text, time, parentMessage);
  }
}
