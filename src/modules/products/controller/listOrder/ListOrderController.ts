// @ts-ignore
import { Request, Response } from 'express';
import { container } from "tsyringe"

import { OrderService } from '../../services/OrderServices';


class ListOrderController {

   async handle(request: Request, response: Response): Promise<Response> {
      const user_id = request.query.user_id;


      const listOrdersService = container.resolve(OrderService)

      const allOrders = await listOrdersService.listOrders(String(user_id));

      return response.json(allOrders);

   }
}

export { ListOrderController };
