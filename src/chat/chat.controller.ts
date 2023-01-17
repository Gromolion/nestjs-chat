import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { GuestExceptionFilter } from '../auth/filters/guestException.filter';
import { CurrentUserInterceptor } from '../users/current-user.interceptor';
import { UsersService } from '../users/users.service';
import { MessagesService } from "../messages/messages.service";

@UseFilters(GuestExceptionFilter)
@UseGuards(AuthenticatedGuard)
@Controller('chat')
export class ChatController {
  constructor(
    private readonly userService: UsersService,
    private readonly messageService: MessagesService,
  ) {}
  @Get()
  @UseInterceptors(CurrentUserInterceptor)
  async chat(@Req() req, @Res() res) {
    const user = req.user;

    const users = await this.userService.findAll();
    const messages = await this.messageService.findAllWithParents();

    return res.render('chat/index', {
      title: 'Чат',
      currentName: user.name,
      users: users,
      messages: messages,
    });
  }
}
