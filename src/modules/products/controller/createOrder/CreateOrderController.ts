// @ts-ignore
import { Request, Response } from 'express';
import { container } from "tsyringe"

import { CreateOrderService } from '../../services/CreateOrderService';


class CreateOrderController {

   async handle(request: Request, response: Response): Promise<Response> {
      const {
         adm_user_id, customer_name, customer_phone, customer_address, products_ids
      } = request.body;

      let filename = request.file?.filename
      if (filename == undefined) {
         filename = ""
      }

      const productsIds = products_ids.split(",") //productsIDS sao passdos no seguinte formato id|3, ex: asdasd-as12312-sdasd-sas323 | 3 

      const createOrder = container.resolve(CreateOrderService)


      const status = "opened"

      await createOrder.execute({
         adm_user_id, customer_address, customer_name, customer_phone, products_ids: productsIds, status
      });

      return response.status(201).send();


   }
}

export { CreateOrderController };

//Missing test