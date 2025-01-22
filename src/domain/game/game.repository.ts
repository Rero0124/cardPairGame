import { PrismaService } from "src/provider/db/prisma/prisma.service";

export class GameRepository {
  constructor(private prisma: PrismaService) {}
  
}