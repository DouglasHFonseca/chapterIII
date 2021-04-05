import { Request, Response } from "express";
import { container } from "tsyringe";

import { SUWGBIUseCase } from "./SUWGBIUseCase";

class SUWGBIController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const sUWGBIUseCase = container.resolve(SUWGBIUseCase);

    const foundUser = await sUWGBIUseCase.execute({ user_id });

    return response.json(foundUser);
  }
}

export { SUWGBIController };
