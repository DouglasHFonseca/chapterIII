import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateGameDTO } from "../../dtos";
import { IGamesRepository } from "../../repositories/IGamesRepository";

@injectable()
class CreateGameUseCase {
  constructor(
    @inject("GamesRepository")
    private gamesRepository: IGamesRepository
  ) {}

  async execute({ title }: ICreateGameDTO): Promise<void> {
    const gameAlreadyExists = await this.gamesRepository.findByTitle(title);

    if (gameAlreadyExists) {
      throw new AppError("Game already exists!");
    }

    await this.gamesRepository.create({ title });
  }
}

export { CreateGameUseCase };
