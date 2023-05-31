import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { UserRepository } from "../modules/users/repositories/implementations/UserRepository";
import { AppError } from "../shared/errors/AppError";

interface IPayload{
   sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

   const authHeader = request.headers.authorization;

   if(!authHeader){
      throw new AppError("Token missing", 401)
   }

   // Bearer 234654jk564jn645j45645
   const [, token] = authHeader.split(" ")

   try {
      const {sub} = verify(token, "a401dd02b72c03e65c64d1ec858def08") as IPayload
      
      const userRepository = new UserRepository()
      const user = await userRepository.findById(sub)

      if(!user){
         throw new AppError("User does not exists!")
      }

      next()
   } catch {
      throw new AppError("Invalid token",401)
   }
   

}