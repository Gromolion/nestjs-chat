import { Controller, Get, Req, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index(@Req() req, @Res() res): string {
    if (req.isAuthenticated()) return res.redirect('/chat');
    return res.redirect('/auth/login');
  }
}
