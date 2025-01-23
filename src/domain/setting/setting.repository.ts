import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/provider/db/prisma/prisma.service";

@Injectable()
export class SettingRepository {
  constructor(private prisma: PrismaService) {}
  
}