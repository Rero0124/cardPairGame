import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000'),
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  loginKey: process.env.LOGIN_KEY || '',
  passphrase: process.env.PASSPHRASE || '1234'
}));