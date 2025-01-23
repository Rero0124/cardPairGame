import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { CommonService } from "./common.service";
import { FastifyReply } from 'fastify';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('crypto/rsa/key')
  cryptoKeyRsa() {
    return this.commonService.getPublicKeyRSA();
  }

  @Post('crypto/rsa/encode')
  async cryptoKeyRsaEncode(@Body('data') data: string) {
    const result = await this.commonService.getRSAEncodedData(data);
    return { result: result };
  }

  @Post('crypto/rsa/decode')
  async cryptoKeyRsaDecode(@Body('data') data: string) {
    const result = await this.commonService.getRSADecodedData(data);
    return { result: result };
  }

  @Post('crypto/test')
  async cryptoTest(@Body() body: { encryptedDataBase64: string, encryptedKeyBase64: string, encryptedIVBase64: string }) {
    const result = await this.commonService.getDecodedClientAESData(body.encryptedDataBase64, body.encryptedKeyBase64, body.encryptedIVBase64);
    return { result: result };
  }

  @Get('multi')
  multiMap(@Res() res: FastifyReply) {
    return res.view('/index.hbs', { isMulti: true });
  }
}