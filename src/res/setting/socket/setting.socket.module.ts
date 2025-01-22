import { Module } from '@nestjs/common';
import { SettingSocketGateway } from './setting.socket.gateway';

@Module({
  providers: [SettingSocketGateway],
})

export class SettingSocketModule {}