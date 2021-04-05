import { Request, Response } from "express";
import { container } from "tsyringe";

import { AddGameUseCase } from "./AddGameUseCase";

class AddGameController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, email } = request.body;
    const addGameUseCase = container.resolve(AddGameUseCase);

    await addGameUseCase.execute({ title, email });

    return response.send();
  }
}

export { AddGameController };
