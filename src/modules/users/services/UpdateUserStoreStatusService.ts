import { IUserRepository } from '../repositories/IUserRepository'
import { inject, injectable } from "tsyringe"
import { AppError } from '../../../shared/errors/AppError';

interface IRequest {
   user_id: string;
   store_status: "opened" | "closed"
}

@injectable()
class UpdateUserStoreStatusSevice {

   constructor(
      @inject("UserRepository")
      private UserRepository: IUserRepository) {
   }

   async execute({
      user_id, store_status,
   }: IRequest): Promise<void> {
      try {
         const foundUser = await this.UserRepository.findById(user_id)

         if (!foundUser) {
            throw new AppError("User does not exists")
         }

         foundUser.store_status = store_status;

         await this.UserRepository.save(foundUser)

      } catch (error) {
         throw new AppError("Error updating service")
      }

   }
}

export { UpdateUserStoreStatusSevice };
