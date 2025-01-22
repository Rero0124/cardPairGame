import { Module } from '@nestjs/common';
import { AppSocketGateway } from './app.socket.gateway';

@Module({
  providers: [AppSocketGateway],
})

export class AppSocketModule {}