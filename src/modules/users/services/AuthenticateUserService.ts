import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repositories/IUserRepository";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt"
import { AppError } from "../../../shared/errors/AppError";

interface IResquest {
   username: string;
   password: string;
}

interface IResponse {
   user: {
      name: string
      username: string;
      user_id: string;
      business_name: string;
   },
   token: string;
}

@injectable()
class AuthenticateUserService {

   constructor(
      @inject("UserRepository")
      private UserRepository: IUserRepository) {
   }

   async execute({ username, password }: IResquest): Promise<IResponse> {

      const user = await this.UserRepository.findByName(username)

      if (!user) {
         throw new AppError("Email or password incorrect")
      }

      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
         throw new AppError("Email or password incorrect")
      }

      const token = sign({}, "a401dd02b72c03e65c64d1ec858def08", {
         subject: user.id,
         expiresIn: "10d"
      });

      const tokenReturn: IResponse = {
         token,
         user: {
            name: user.name,
            username: user.username,
            user_id: user.id,
            business_name: user.business_name
         }
      }

      return tokenReturn
   }
}

export { AuthenticateUserService }