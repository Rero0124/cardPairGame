import { GameRepository } from "./game.repository";
import { IGameService } from "./game.service.interface";

export class GameService implements IGameService {
  constructor(private readonly gameRepository: GameRepository) {}
}