import { Request, Response, urlencoded } from 'express';
import { container } from "tsyringe"

import { UpdateProductService } from '../../services/UpdateProductService';

class UpdateProductController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name, description, price,
    } = request.body;

    const enabled: boolean = request.body.enabled
    const { id } = request.params

    const updateProductService = container.resolve(UpdateProductService)

    await updateProductService.execute({
      id, name, price, description, enabled
    });

    return response.status(201).send();
  }
}

export { UpdateProductController };