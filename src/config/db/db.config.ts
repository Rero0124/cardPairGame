import { registerAs } from "@nestjs/config";

export default registerAs('db', () => ({
  port: process.env.DB_PORT || 5432,
  host: process.env.DB_HOST || 'localhost',
  name: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  passwd: process.env.DB_PASSWD || '1234'
}));