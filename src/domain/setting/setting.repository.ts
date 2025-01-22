import { PrismaService } from "src/provider/db/prisma/prisma.service";

export class SettingRepository {
  constructor(private prisma: PrismaService) {}
  
}