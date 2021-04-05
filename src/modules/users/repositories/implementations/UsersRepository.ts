import { getRepository, Repository } from "typeorm";

import { Game } from "../../../games/entities/Game";
import {
  IFindUserWithGamesDTO,
  IFindUserByFullNameDTO,
  ICreateUserDTO,
} from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    first_name,
    last_name,
    email,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ first_name, last_name, email });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne(user_id, {
      relations: ["games"],
    });

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(`SELECT * FROM USERS ORDER BY first_name`); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(
      `SELECT * FROM USERS WHERE LOWER(first_name)=LOWER($1) and LOWER(last_name)=LOWER($2)`,
      [first_name, last_name]
    ); // Complete usando raw query
  }

  async addGameToUser(user: User, game: Game): Promise<void> {
    this.repository
      .createQueryBuilder()
      .relation(User, "games")
      .of(user)
      .add(game);
  }

  async verifyGame(user: User, game: Game): Promise<Game> {
    const validGame = await this.repository
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.games", "games")
      .where("users.id=:id", { id: user.id })
      .getOneOrFail();

    const findGame = validGame.games.find((gameID) => gameID.id === game.id);

    return findGame;
  }
}
