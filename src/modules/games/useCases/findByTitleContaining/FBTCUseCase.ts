import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IFindGameDTO } from "../../dtos";
import { Game } from "../../entities/Game";
import { IGamesRepository } from "../../repositories/IGamesRepository";

@injectable()
class FBTCUseCase {
  constructor(
    @inject("GamesRepository")
    private gamesRepository: IGamesRepository
  ) {}

  async execute({ title }: IFindGameDTO): Promise<Game[]> {
    const titleContaining = await this.gamesRepository.findByTitleContaining(
      title
    );

    if (!titleContaining) {
      throw new AppError("A game containing this description was not found!");
    }

    return titleContaining;
  }
}

export { FBTCUseCase };
