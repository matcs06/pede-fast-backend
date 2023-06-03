import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { container } from "tsyringe"

import { DeleteProductService } from '../../services/DeleteProductService';

class DeleteProductController {

  async handle(request: Request, response: Response): Promise<Response> {
    const product_id = request.query.id;

    const deleteProductService = container.resolve(DeleteProductService)

    await deleteProductService.execute(String(product_id));

    return response
      .status(200)
      .json({ message: 'Product successfully deleted!!' });

  }
}

export { DeleteProductController };
