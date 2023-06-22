import { Request, Response } from 'express';
import { container } from "tsyringe"

import { UpdateUserBusinessService } from '../../services/UpdateUserBusinessService';

class UpdateUserBusinessController {

   async handle(request: Request, response: Response): Promise<Response> {
      const {
         user_id, username, phone, business_name, address, update_image
      } = request.body;

      let filename = request.file?.filename
      if (filename == undefined) {
         filename = ""
      }

      const updateUserBusinessService = container.resolve(UpdateUserBusinessService)

      await updateUserBusinessService.execute({
         username, phone, business_name, address, update_image, image_url: filename
      });

      return response.status(201).send();
   }
}

export { UpdateUserBusinessController };