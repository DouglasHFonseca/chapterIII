import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { ICreateGameDTO } from "../../dtos";
import { Game } from "../../entities/Game";
import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }
  async create({ title }: ICreateGameDTO): Promise<Game> {
    const gamer = this.repository.create({ title });

    return this.repository.save(gamer);
  }
  async findByTitle(title: string): Promise<Game> {
    const game = await this.repository
      .createQueryBuilder()
      .where("LOWER(title) = LOWER(:title)", { title })
      .getOne();

    return game;
  }
  async findById(id: string): Promise<Game> {
    return this.repository.findOne({ id });
  }
  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder()
      .where("LOWER(title) ILIKE LOWER(:title)", { title: `%${param}%` })
      .getMany();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT COUNT(TITLE) FROM GAMES`);
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const validGame = await this.repository
      .createQueryBuilder("games")
      .leftJoinAndSelect("games.users", "users")
      .where("games.id=:id", { id })
      .getOneOrFail();

    return validGame.users;
  }
}
