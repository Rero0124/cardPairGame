import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameSocketModule } from './socket/game.socket.module';

@Module({
  imports: [GameSocketModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}

