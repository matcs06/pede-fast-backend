import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProductsService } from '../../services/ListProductsService';

class ListProductController {

  async handle(request: Request, response: Response): Promise<Response> {
    
    const {user_id} = request.query

    const listProductService = container.resolve(ListProductsService)

    const all = await listProductService.execute(String(user_id));

    return response.json(all);
  }
}

export { ListProductController };
