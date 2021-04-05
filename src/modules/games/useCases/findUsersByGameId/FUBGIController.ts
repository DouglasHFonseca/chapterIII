import { Request, Response } from "express";
import { container } from "tsyringe";

import { FUBGIUseCase } from "./FUBGIUseCase";

class FUBGIController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { game_id } = request.params;

    const fUBGIUseCase = container.resolve(FUBGIUseCase);

    const foundUsersByIDGame = await fUBGIUseCase.execute({ game_id });

    return response.json(foundUsersByIDGame);
  }
}

export { FUBGIController };
