import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUserService } from '../../services/ListUserService';

class ListUserController {

  async handle(request: Request, response: Response): Promise<Response> {
      
    const { user_id }  = request.params  

    const listUserervice = container.resolve(ListUserService)

    const foundUser = await listUserervice.execute(user_id);

    return response.json(foundUser);
  }
}

export { ListUserController };