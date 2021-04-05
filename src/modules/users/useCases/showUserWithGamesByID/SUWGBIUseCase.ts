import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IFindUserWithGamesDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class SUWGBIUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id }: IFindUserWithGamesDTO): Promise<User> {
    const userWithGames = await this.usersRepository.findUserWithGamesById({
      user_id,
    });

    if (!userWithGames) {
      throw new AppError("User not found!", 404);
    }

    return userWithGames;
  }
}

export { SUWGBIUseCase };
