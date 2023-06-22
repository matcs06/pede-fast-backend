import { Request, Response } from 'express';
import { container } from "tsyringe"

import { UpdateUserStoreStatusSevice } from '../../services/UpdateUserStoreStatusService';

class UpdateUserStoreStatusController {

   async handle(request: Request, response: Response): Promise<Response> {

      const { user_id, store_status } = request.body // "opened or closed"

      const updateUserStoreStatus = container.resolve(UpdateUserStoreStatusSevice)

      await updateUserStoreStatus.execute({
         user_id, store_status,
      });

      return response.status(201).send();
   }
}

export { UpdateUserStoreStatusController };