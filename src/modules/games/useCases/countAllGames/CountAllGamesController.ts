import { Request, Response } from "express";
import { container } from "tsyringe";

import { CountAllGamesUseCase } from "./CountAllGamesUseCase";

class CountAllGamesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const countAllGamesUseCase = container.resolve(CountAllGamesUseCase);

    const count = await countAllGamesUseCase.execute();

    return response.json({
      "Total de Games Listados": count,
    });
  }
}

export { CountAllGamesController };
