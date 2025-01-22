import { Module } from "@nestjs/common";
import { SettingService } from "./setting.service";
import { SettingController } from "./setting.controller";
import { SettingSocketModule } from "./socket/setting.socket.module";

@Module({
  imports: [SettingModule, SettingSocketModule],
  controllers: [SettingController],
  providers: [SettingService]
})

export class SettingModule {};