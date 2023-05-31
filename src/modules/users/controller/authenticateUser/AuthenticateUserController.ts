import { Request, Response } from 'express';
import { container } from "tsyringe";
import { AuthenticateUserService } from "../../services/AuthenticateUserService";

class AuthenticateUserController {
   async handle(request: Request, response: Response): Promise<Response>{
 
     const { password, username} = request.body
      
     const authenticateUserService = container.resolve(AuthenticateUserService);
      
     const token = await authenticateUserService.execute({username, password});

     return response.json(token)
   }
}
export {AuthenticateUserController}