import { Module } from '@nestjs/common';
import { GameSocketGateway } from './game.socket.gateway';

@Module({
  providers: [GameSocketGateway],
})

export class GameSocketModule {}