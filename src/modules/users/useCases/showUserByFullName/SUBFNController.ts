import { Request, Response } from "express";
import { container } from "tsyringe";

import { SUBFNUseCase } from "./SUBFNUseCase";

class SUBNFController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { first_name, last_name } = request.body;
    const sUBNFUseCase = container.resolve(SUBFNUseCase);

    const foundUser = await sUBNFUseCase.execute({ first_name, last_name });

    return response.json(foundUser);
  }
}

export { SUBNFController };
