import { Router } from "express";

import { AddGameController } from "../modules/users/useCases/addGame/AddGameController";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { SAUBOFNController } from "../modules/users/useCases/showAllUsersByOrderedFirstName/SAUBOFNcontroller";
import { SUBNFController } from "../modules/users/useCases/showUserByFullName/SUBFNController";
import { SUWGBIController } from "../modules/users/useCases/showUserWithGamesByID/SUWGBIController";

const usersRoutes = Router();

const sAUBOFNController = new SAUBOFNController();

const createUserController = new CreateUserController();
const addGameController = new AddGameController();
const sUBNFController = new SUBNFController();
const sUWGBIController = new SUWGBIController();

usersRoutes.get("/ordered", sAUBOFNController.handle);
usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/add", addGameController.handle);
usersRoutes.get("/user", sUBNFController.handle);
usersRoutes.get("/user/:user_id", sUWGBIController.handle);

export { usersRoutes };
