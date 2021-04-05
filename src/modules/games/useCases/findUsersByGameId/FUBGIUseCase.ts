import { inject, injectable } from "tsyringe";
import validate from "uuid-validate";

import { AppError } from "../../../../errors/AppError";
import { User } from "../../../users/entities/User";
import { IFindIDGameDTO } from "../../dtos";
import { IGamesRepository } from "../../repositories/IGamesRepository";

@injectable()
class FUBGIUseCase {
  constructor(
    @inject("GamesRepository")
    private gamesRepository: IGamesRepository
  ) {}
  async execute({ game_id }: IFindIDGameDTO): Promise<User[]> {
    const isUUID = validate(game_id);

    if (!isUUID) {
      throw new AppError("ID Format Incorrect");
    }
    const gameAlreadyExist = await this.gamesRepository.findById(game_id);

    if (!gameAlreadyExist) {
      throw new AppError("Game not found!", 404);
    }

    const listAllUser = await this.gamesRepository.findUsersByGameId(game_id);

    return listAllUser;
  }
}

export { FUBGIUseCase };
