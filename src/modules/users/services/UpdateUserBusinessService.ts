import { IUserRepository } from '../repositories/IUserRepository'
import { inject, injectable } from "tsyringe"
import { AppError } from '../../../shared/errors/AppError';

interface IRequest {
   username: string;
   business_name: string;
   address: string;
   phone: string;
   update_image: string;
   image_url: string;
}

@injectable()
class UpdateUserBusinessService {

   constructor(
      @inject("UserRepository")
      private UserRepository: IUserRepository) {
   }

   async execute({
      username, phone, business_name, address, update_image, image_url
   }: IRequest): Promise<void> {
      try {
         const foundUser = await this.UserRepository.findByName(username)

         if (!foundUser) {
            throw new AppError("User does not exists")
         }

         foundUser.phone = phone;
         foundUser.address = address;
         foundUser.business_name = business_name;

         if (update_image === "yes") {
            foundUser.business_image_url = image_url
         }

         await this.UserRepository.save(foundUser)

      } catch (error) {
         throw new AppError("Error updating service")
      }

   }
}

export { UpdateUserBusinessService };
