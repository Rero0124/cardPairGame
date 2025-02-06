import { Controller, Get, Res } from "@nestjs/common";
import { GameService } from "./game.service";
import { FastifyReply } from 'fastify';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('single')
  single(@Res() res: FastifyReply) {
    return res.view('game', { isMulti: false, socket: 'game' });
  }

  @Get('room')
  roomList(@Res() res: FastifyReply) {
    return res.view('game', { isMulti: true });
  }

  @Get('room/:id')
  room(@Res() res: FastifyReply) {
    return res.view('game', { isMulti: true });
  }
}