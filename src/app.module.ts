import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppSocketModule } from './socket/app.socket.module';
import { GameModule } from './res/game/game.module';
import { SettingModule } from './res/setting/setting.module';

@Module({
  imports: [AppSocketModule, GameModule, SettingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

