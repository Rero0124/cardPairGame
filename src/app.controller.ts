import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyReply } from 'fastify';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello (@Res() res: FastifyReply) {
    return res.view('index.hbs', { message: this.appService.getHello() });
  }
}
