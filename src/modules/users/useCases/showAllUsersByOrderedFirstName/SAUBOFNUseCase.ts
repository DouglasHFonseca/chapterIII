import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class SAUBOFNUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<User[]> {
    const usersOrdered = await this.usersRepository.findAllUsersOrderedByFirstName();

    return usersOrdered;
  }
}

export { SAUBOFNUseCase };
