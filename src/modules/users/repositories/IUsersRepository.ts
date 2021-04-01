import {
  IFindUserWithGamesDTO,
  IFindUserByFullNameDTO,
  ICreateUserDTO,
} from "../dtos";
import { User } from "../entities/User";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findUserWithGamesById(data: IFindUserWithGamesDTO): Promise<User>;
  findAllUsersOrderedByFirstName(): Promise<User[]>;
  findUserByFullName(data: IFindUserByFullNameDTO): Promise<User[] | undefined>;
}
