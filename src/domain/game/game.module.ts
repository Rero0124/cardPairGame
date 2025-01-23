import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameSocketModule } from './socket/game.socket.module';
import { GameRepository } from './game.repository';
import { PrismaService } from 'src/provider/db/prisma/prisma.service';

@Module({
  imports: [GameSocketModule],
  controllers: [GameController],
  providers: [GameService, GameRepository, PrismaService],
})
export class GameModule {}

