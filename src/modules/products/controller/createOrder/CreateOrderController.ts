// @ts-ignore
import { Request, Response } from 'express';
import { container } from "tsyringe"

import { OrderService } from '../../services/OrderServices';


class CreateOrderController {

   async handle(request: Request, response: Response): Promise<Response> {
      const {
         adm_user_id, customer_name, customer_phone, customer_address, products_ids, product
      } = request.body;
      const productsIds = products_ids.split(",") //productsIDS sao passdos no seguinte formato id|3, ex: asdasd-as12312-sdasd-sas323 | 3 
      const createOrder = container.resolve(OrderService)


      const status = "opened"

      await createOrder.execute({
         adm_user_id, customer_address, customer_name, customer_phone, products_ids: productsIds, status, product
      });

      return response.status(201).send();


   }
}

export { CreateOrderController };
