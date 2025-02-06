import { Controller, Get, Res } from "@nestjs/common";
import { LoginService } from "./login.service";
import { FastifyReply } from "fastify";

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  settingPage(@Res() res: FastifyReply) {
    return res.view('login', { message: '설정이에용', socket: 'setting' });
  }
}