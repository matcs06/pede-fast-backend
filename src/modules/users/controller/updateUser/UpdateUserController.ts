import { Request, Response } from 'express';
import { container } from "tsyringe"

import { UpdateUserService } from '../../services/UpdateUserService';

class UpdateUserController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      username, phone, business_name, address, payment_day, payment_status
    } = request.body;

    const updateUserService = container.resolve(UpdateUserService)

    await updateUserService.execute({
      username, phone, business_name, address, payment_day, payment_status
    });

    return response.status(201).send();
  }
}

export { UpdateUserController };