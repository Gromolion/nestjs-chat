import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { UsersService } from '../users/users.service';
import MessageDto from '../messages/dto/message.dto';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly userService: UsersService,
    private readonly messageService: MessagesService,
  ) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('login')
  async handleLogin(client: Socket, payload) {
    const user = await this.userService.findUser(payload.name);

    user.online = true;
    user.socket = client.id;

    await this.userService.save(user);
  }

  @SubscribeMessage('newMessage')
  async handleMessage(client: Socket, messageDto: MessageDto): Promise<void> {
    const user = await this.userService.findUser(messageDto.from);

    const message = await this.messageService.create(user, messageDto);
    console.log(message)
    await this.messageService.save(message);

    this.server.emit('addMessage', message);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    const user = await this.userService.findUserBySocket(client.id);

    if (user) {
      user.online = false;
      user.socket = null;

      await this.userService.save(user);
    }

    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
