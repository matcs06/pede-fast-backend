import { Request, Response, urlencoded } from 'express';
import { container } from "tsyringe"

import { OrderService } from '../../services/OrderServices';

class UpdateOrderController {

   async handle(request: Request, response: Response): Promise<Response> {
      const {
         order_id,
         status
      } = request.body;

      const updateOrderService = container.resolve(OrderService)

      await updateOrderService.updateOrder({
         order_id, status
      });

      return response.status(201).send();
   }
}

export { UpdateOrderController };