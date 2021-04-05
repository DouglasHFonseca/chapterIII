import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IGamesRepository } from "../../../games/repositories/IGamesRepository";
import { IAddGameDTO } from "../../dtos";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class AddGameUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("GamesRepository")
    private gamesRepository: IGamesRepository
  ) {}

  async execute({ email, title }: IAddGameDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User not found!");
    }

    const game = await this.gamesRepository.findByTitle(title);

    if (!game) {
      const newGame = await this.gamesRepository.create({ title });
      await this.usersRepository.addGameToUser(user, newGame);
    } else {
      const verifyGame = await this.usersRepository.verifyGame(user, game);
      if (verifyGame) {
        throw new AppError("The game is already on the user list");
      } else {
        await this.usersRepository.addGameToUser(user, game);
      }
    }
  }
}

export { AddGameUseCase };
