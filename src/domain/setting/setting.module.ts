import { Module } from "@nestjs/common";
import { SettingService } from "./setting.service";
import { SettingController } from "./setting.controller";
import { SettingSocketModule } from "./socket/setting.socket.module";
import { SettingRepository } from "./setting.repository";
import { PrismaService } from "src/provider/db/prisma/prisma.service";

@Module({
  imports: [SettingSocketModule],
  controllers: [SettingController],
  providers: [SettingService, SettingRepository, PrismaService]
})

export class SettingModule {};