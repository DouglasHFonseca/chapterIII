import { Router } from "express";

import { CountAllGamesController } from "../modules/games/useCases/countAllGames/CountAllGamesController";
import { CreateGameController } from "../modules/games/useCases/createGame/createGameController";
import { FBTCController } from "../modules/games/useCases/findByTitleContaining/FBTCController";
import { FUBGIController } from "../modules/games/useCases/findUsersByGameId/FUBGIController";

const gamesRoutes = Router();

const createGameController = new CreateGameController();
const fBTCController = new FBTCController();
const countAllGamesController = new CountAllGamesController();
const fUBGIController = new FUBGIController();

gamesRoutes.post("/", createGameController.handle);
gamesRoutes.get("/", fBTCController.handle);
gamesRoutes.get("/count", countAllGamesController.handle);
gamesRoutes.get("/id/:game_id", fUBGIController.handle);

export { gamesRoutes };
