import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppSocketModule } from './socket/app.socket.module';
import { GameModule } from './domain/game/game.module';
import { SettingModule } from './domain/setting/setting.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app/app.config';
import { CommonModule } from './domain/common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [...(process.env.NODE_ENV === 'production' ? ['.env.production.local', '.env.production'] : ['.env.development.local', '.env.development']), '.env'],
      load: [appConfig],
      isGlobal: true
    }),
    AppSocketModule, 
    GameModule, 
    SettingModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_PIPE',
      useValue: ValidationPipe
    }
  ],
})
export class AppModule {}

