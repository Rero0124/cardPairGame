import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/provider/db/prisma/prisma.service";

@Injectable()
export class GameRepository {
  constructor(private prisma: PrismaService) {}
  
}