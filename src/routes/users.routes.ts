import { Router } from "express";

import { SAUBOFNController } from "../modules/users/useCases/showAllUsersByOrderedFirstName/SAUBOFNcontroller";

const usersRoutes = Router();

const sAUBOFNController = new SAUBOFNController();
usersRoutes.get("/ordered", sAUBOFNController.handle);

export { usersRoutes };
