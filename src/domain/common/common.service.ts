import { ConfigService } from "@nestjs/config";
import { CommonRepository } from "./common.repository";
import { ICommonService } from "./common.service.interface";
import { Injectable, Logger } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class CommonService implements ICommonService {
  constructor(
    private readonly commonRepository: CommonRepository,
    private configService: ConfigService
  ) {}
  private readonly logger = new Logger('CommonService');

  publicKey: string;
  privateKey: string;

  async prevUseRSA() {
    if(!(this.publicKey && this.privateKey)) {
      await this.generateKeyPairRSA();
    }
  }

  async generateKeyPairRSA() {
    const { publicKey, privateKey } = await crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: this.configService.get('app.passphrase')
      }
    });
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    return { publicKey, privateKey };
  }

  async getPublicKeyRSA() {
    await this.prevUseRSA();
    return { key: this.publicKey };
  }

  async getRSAEncodedData(data: string) {
    await this.prevUseRSA();
    return crypto.publicEncrypt(this.publicKey, Buffer.from(data)).toString('base64');
  }

  async getRSADecodedData(data: string) {
    await this.prevUseRSA();
    const key = crypto.createPrivateKey({
      key: this.privateKey,
      format: 'pem',
      passphrase: this.configService.get('app.passphrase')
    });
    return crypto.privateDecrypt(key, Buffer.from(data, 'base64')).toString('utf-8');
  }

  async getDecodedClientAESData(encryptedDataBase64: string, encryptedKeyBase64: string, encryptedIVBase64: string) {
    const key = crypto.privateDecrypt({
      key: this.privateKey,
      passphrase: this.configService.get('app.passphrase'),
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256'
    }, Buffer.from(encryptedKeyBase64, 'base64'));
    const iv = crypto.privateDecrypt({
      key: this.privateKey,
      passphrase: this.configService.get('app.passphrase'),
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256'
    }, Buffer.from(encryptedIVBase64, 'base64'));
    const deciper = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let result = deciper.update(encryptedDataBase64, 'base64', 'utf-8');
    result += deciper.final('utf-8');
    this.logger.log(result);
    return result;
  }
}