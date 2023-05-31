import { Request, Response } from 'express';
import { container } from "tsyringe"

import { DeleteProductService } from '../../services/DeleteProductService';

class DeleteProductController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id
    } = request.params;

    const { user_name } = request.query

    const deleteProductService = container.resolve(DeleteProductService)

    await deleteProductService.execute(id);

    return response
      .status(200)
      .json({ message: 'Product successfully deleted!!' });

  }
}

export { DeleteProductController };
