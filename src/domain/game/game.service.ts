import { Injectable } from "@nestjs/common";
import { GameRepository } from "./game.repository";
import { IGameService } from "./game.service.interface";

@Injectable()
export class GameService implements IGameService {
  constructor(private readonly gameRepository: GameRepository) {}
}