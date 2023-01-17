import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class RegisterExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const validationMessages = JSON.parse(
      JSON.stringify(exception.getResponse()),
    ).message;

    let parsedMessages;

    if (typeof validationMessages === "object") {
      parsedMessages = {};
      validationMessages.forEach((message) => {
        parsedMessages[message.property] = [];

        for (const [key, value] of Object.entries(message.constraints)) {
          parsedMessages[message.property].push({ name: value });
        }
      });
    } else {
      parsedMessages = {
        name: {
          name: 'Имя занято',
        },
      };
    }

    if (exception instanceof BadRequestException) {
      request.flash('validationErrors', JSON.stringify(parsedMessages));
      response.redirect('/auth/register');
    } else {
      response.redirect('/auth/register');
    }
  }
}
