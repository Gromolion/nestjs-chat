import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import RegisterUserDto from './dto/registerUser.dto';
import { AuthService } from './auth.service';
import { LoginExceptionFilter } from './filters/loginException.filter';
import { LoginGuard } from './guards/login.guard';
import { RegisterExceptionFilter } from './filters/registerException.filter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  loginForm(@Res() res: Response, @Req() req) {
    return res.render('auth/login', {
      title: 'Авторизация',
      error: req.flash('loginError'),
    });
  }

  @Post('login')
  @UseFilters(LoginExceptionFilter)
  @UseGuards(LoginGuard)
  login(@Res() res) {
    return res.redirect('/');
  }

  @Get('register')
  registerForm(@Res() res: Response, @Req() req) {
    let validationErrors = req.flash('validationErrors');

    if (validationErrors.length)
      validationErrors = JSON.parse(validationErrors);
    else validationErrors = [];

    return res.render('auth/register', {
      title: 'Регистрация',
      validationErrors: validationErrors,
    });
  }

  @Post('register')
  @UseFilters(RegisterExceptionFilter)
  async register(@Body() registerUserDto: RegisterUserDto) {
    await this.authService.registerUser(registerUserDto);
  }

  @Get('logout')
  logout() {
    return;
  }
}
