// @ts-ignore
import { Request, Response } from 'express';
import { container } from "tsyringe"

import { CreateProductService } from '../../services/CreateProductService';


class CreateProductController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name, description, price, user_id
    } = request.body;

    let filename = request.file?.filename
    if (filename == undefined) {
      filename = ""
    }

    const createProductService = container.resolve(CreateProductService)

    await createProductService.execute({
      name, price, description, user_id, image_url: filename
    });

    return response.status(201).send();
  }
}

export { CreateProductController };
