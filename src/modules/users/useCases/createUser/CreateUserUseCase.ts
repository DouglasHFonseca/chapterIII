import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    first_name,
    last_name,
    email,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already Exists!");
    }

    await this.usersRepository.create({
      first_name,
      last_name,
      email,
    });
  }
}

export { CreateUserUseCase };
