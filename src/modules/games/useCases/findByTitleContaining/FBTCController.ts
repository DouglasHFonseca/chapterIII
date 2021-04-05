import { Request, response, Response } from "express";
import { container } from "tsyringe";

import { FBTCUseCase } from "./FBTCUseCase";

class FBTCController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    const fBITCUseCase = container.resolve(FBTCUseCase);

    const titleContaining = await fBITCUseCase.execute({ title });

    return response.json(titleContaining);
  }
}
export { FBTCController };
