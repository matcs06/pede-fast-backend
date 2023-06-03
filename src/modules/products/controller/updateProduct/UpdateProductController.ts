import { Request, Response, urlencoded } from 'express';
import { container } from "tsyringe"

import { UpdateProductService } from '../../services/UpdateProductService';

class UpdateProductController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name, description, price, quantity, enabled, product_id
    } = request.body;

    let filename = request.file?.filename
    if (filename == undefined) {
      filename = ""
    }

    const updateProductService = container.resolve(UpdateProductService)

    await updateProductService.execute({
      id: product_id, name, price, description, quantity, enabled, filename
    });

    return response.status(201).send();
  }
}

export { UpdateProductController };