import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(ForbiddenException)
export class GuestExceptionFilter<ForbiddenException>
  implements ExceptionFilter
{
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.redirect('/auth/login');
  }
}
