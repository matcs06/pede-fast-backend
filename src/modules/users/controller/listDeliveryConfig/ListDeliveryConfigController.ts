import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListDeliveryConfigService } from '../../services/ListDeliveryConfigService';

class ListDeliveryConfigController {

   async handle(request: Request, response: Response): Promise<Response> {

      const { user_id } = request.params

      const listDeliveryConfigervice = container.resolve(ListDeliveryConfigService)

      const foundDeliveryConfig = await listDeliveryConfigervice.execute(user_id);

      return response.json(foundDeliveryConfig);
   }
}

export { ListDeliveryConfigController };