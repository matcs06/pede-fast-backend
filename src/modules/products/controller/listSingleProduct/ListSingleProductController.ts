import { Request, Response } from 'express';
import {container} from "tsyringe"

import {  ListSingleProductService} from '../../services/ListSingleProductService';

class ListSingleProductController {
 
  async handle(request: Request, response: Response):Promise<Response> {
    const {
      id
    } = request.params;

    const listSingleProductService = container.resolve(ListSingleProductService)

    const product = await listSingleProductService.execute(id);

    return response.json(product);
    
  }
}

export { ListSingleProductController };