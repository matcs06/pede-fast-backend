import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUserProductService } from '../../services/ListUserProductService';

class ListUserProductController {

   async handle(request: Request, response: Response): Promise<Response> {

      const { username } = request.query
      const listUserProductService = container.resolve(ListUserProductService)

      const foundUserProducts = await listUserProductService.execute(String(username));

      return response.json(foundUserProducts);
   }
}

export { ListUserProductController };