import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { CommonRepository } from './common.repository';
import { PrismaService } from 'src/provider/db/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [CommonController],
  providers: [CommonService, CommonRepository, PrismaService],
})
export class CommonModule {}

