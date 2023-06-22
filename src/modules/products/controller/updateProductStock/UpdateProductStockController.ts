import { Request, Response, urlencoded } from 'express';
import { container } from "tsyringe"

import { UpdateProductService } from '../../services/UpdateProductService';

class UpdateProductStockController {

   async handle(request: Request, response: Response): Promise<Response> {
      const {
         id, quantity, enabled
      } = request.body;


      const updateProductService = container.resolve(UpdateProductService)

      await updateProductService.updateProductStockOrAvailability({
         id, quantity, enabled
      });

      return response.status(201).send();
   }
}

export { UpdateProductStockController };