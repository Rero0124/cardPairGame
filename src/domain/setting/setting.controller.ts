import { Controller, Get, Res } from "@nestjs/common";
import { SettingService } from "./setting.service";
import { FastifyReply } from "fastify";

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get()
  settingPage(@Res() res: FastifyReply) {
    return res.view('index', { message: '설정이에용' });
  }
}