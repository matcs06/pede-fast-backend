import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllUsersService } from '../../services/ListAllUsersService';

class ListAllUsersController {

  async handle(request: Request, response: Response): Promise<Response> {
      
    const listAllUserService = container.resolve(ListAllUsersService)

    const foundUsers = await listAllUserService.execute();

    return response.json(foundUsers);
  }
}

export { ListAllUsersController };