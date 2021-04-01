import { getRepository, Repository } from "typeorm";

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
    throw new Error("Method not implemented.");
    // Complete usando ORM
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(`SELECT * FROM USERS ORDER BY first_name`); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(
      `SELECT * FROM USERS WHERE first_name=$1 and first_name=$2`,
      [first_name, last_name]
    ); // Complete usando raw query
  }
}
