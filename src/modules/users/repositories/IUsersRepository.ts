import { Game } from "../../games/entities/Game";
import {
  IFindUserWithGamesDTO,
  IFindUserByFullNameDTO,
  ICreateUserDTO,
} from "../dtos";
import { User } from "../entities/User";

export interface IUsersRepository {
  verifyGame(user: User, game: Game): Promise<Game>;
  create(data: ICreateUserDTO): Promise<void>;
  addGameToUser(user: User, game: Game): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findUserWithGamesById(data: IFindUserWithGamesDTO): Promise<User>;
  findAllUsersOrderedByFirstName(): Promise<User[]>;
  findUserByFullName(data: IFindUserByFullNameDTO): Promise<User[] | undefined>;
}
