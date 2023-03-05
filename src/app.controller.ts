import { Controller, Get, Res } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  getIndex(@Res() res) {
    res.status(307).redirect('/projects');
  }
}
