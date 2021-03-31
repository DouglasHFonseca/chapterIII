import { Request, Response } from "express";
import { container } from "tsyringe";

import { SAUBOFNUseCase } from "./SAUBOFNUseCase";

class SAUBOFNController {
  async handle(request: Request, response: Response): Promise<Response> {
    const sAUBOFNUseCase = container.resolve(SAUBOFNUseCase);

    const allOrdered = await sAUBOFNUseCase.execute();

    return response.json(allOrdered);
  }
}

export { SAUBOFNController };
