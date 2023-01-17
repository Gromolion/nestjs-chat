import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException, ForbiddenException, BadRequestException)
export class LoginExceptionFilter implements ExceptionFilter {
  catch(exception: [HttpException], host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException
    ) {
      request.flash('loginError', 'Неверное имя пользователя или пароль');
      response.redirect('/auth/login');
    } else if (exception instanceof BadRequestException) {
      console.log(exception.message);
      request.flash('errors', exception.message);
      response.redirect('/error');
    }
  }
}
