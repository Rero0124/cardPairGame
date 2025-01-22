import { Controller, Get, Res } from "@nestjs/common";
import { GameService } from "./game.service";
import { FastifyReply } from 'fastify';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('single')
  singleMap(@Res() res: FastifyReply) {
    return res.view('/index.hbs', { isMulti: false });
  }

  @Get('multi')
  multiMap(@Res() res: FastifyReply) {
    return res.view('/index.hbs', { isMulti: true});
  }
}