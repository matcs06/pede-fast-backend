// @ts-ignore
import { Request, Response } from 'express';
import { container } from "tsyringe"

import { OrderService } from '../../services/OrderServices';


class DeleteOrderController {

   async handle(request: Request, response: Response): Promise<Response> {
      const order_id = request.query.order_id;


      const listOrdersService = container.resolve(OrderService)

      await listOrdersService.deleteOrder(String(order_id));

      return response
         .status(200)
         .json({ message: 'Product successfully deleted!!' });


   }
}

export { DeleteOrderController };
