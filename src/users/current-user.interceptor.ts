import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { UsersService } from "./users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.user['id'];

    if (userId) {
      request.user = await this.userService.findUserById(userId);
    }

    return handler.handle();
  }
}
