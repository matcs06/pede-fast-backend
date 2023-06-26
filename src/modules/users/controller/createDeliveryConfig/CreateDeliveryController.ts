import { Request, Response } from 'express';
import { container } from "tsyringe"

import { CreateDeliveryConfigService } from '../../services/CreateDeliveryConfigService';

class CreateDeliveryConfigController {

   async handle(request: Request, response: Response): Promise<Response> {
      const {
         tax, condition, discount_percentage, has_discount, parameter, deactivate_delivery, user_id
      } = request.body;

      const createDeliveryService = container.resolve(CreateDeliveryConfigService)

      await createDeliveryService.execute({
         tax, condition, discount_percentage, has_discount, parameter, deactivate_delivery, user_id
      });

      return response.status(201).send();
   }
}

export { CreateDeliveryConfigController };