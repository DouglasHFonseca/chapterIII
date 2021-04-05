import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class SUBFNUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[]> {
    const userFullName = await this.usersRepository.findUserByFullName({
      first_name,
      last_name,
    });

    if (!userFullName) {
      throw new AppError("User not found");
    }

    return userFullName;
  }
}

export { SUBFNUseCase };
