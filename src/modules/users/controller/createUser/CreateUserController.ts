import { Request, Response } from 'express';
import {container} from "tsyringe"

import { CreateUserService } from '../../services/CreateUserService';

class CreateUserController {
 
  async handle(request: Request, response: Response):Promise<Response> {
    const {
      name, username, password, user_level
    } = request.body;

    const createUserService = container.resolve(CreateUserService)

    await createUserService.execute({
      name,password, username, user_level
    });

    return response.status(201).send();
  }
}

export { CreateUserController };