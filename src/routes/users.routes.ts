import { Router } from "express";

import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { SAUBOFNController } from "../modules/users/useCases/showAllUsersByOrderedFirstName/SAUBOFNcontroller";

const usersRoutes = Router();

const sAUBOFNController = new SAUBOFNController();

const createUserController = new CreateUserController();

usersRoutes.get("/ordered", sAUBOFNController.handle);
usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
