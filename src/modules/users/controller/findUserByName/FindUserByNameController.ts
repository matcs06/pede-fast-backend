import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindUserByNameService } from '../../services/FindUserByNameService';

class FindUserByNameController {

  async handle(request: Request, response: Response): Promise<Response> {
      
    const { username }  = request.params  
    const listUserervice = container.resolve(FindUserByNameService)

    const foundUser = await listUserervice.execute(username);

    return response.json(foundUser);
  }
}

export { FindUserByNameController };