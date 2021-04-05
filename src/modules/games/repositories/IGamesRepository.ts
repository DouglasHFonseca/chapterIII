import { User } from "../../users/entities/User";
import { ICreateGameDTO } from "../dtos";
import { Game } from "../entities/Game";

export interface IGamesRepository {
  findById(id: string): Promise<Game>;
  create(data: ICreateGameDTO): Promise<Game>;
  findByTitle(title: string): Promise<Game>;
  findByTitleContaining(title: string): Promise<Game[]>;
  countAllGames(): Promise<[{ count: string }]>;
  findUsersByGameId(id: string): Promise<User[]>;
}
