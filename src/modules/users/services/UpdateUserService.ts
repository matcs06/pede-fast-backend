import { IUserRepository } from '../repositories/IUserRepository'
import { inject, injectable } from "tsyringe"
import { AppError } from '../../../shared/errors/AppError';

interface IRequest {
  username: string;
  business_name: string;
  address: string;
  phone: string;
  payment_day: string;
  payment_status: string;
}

@injectable()
class UpdateUserService {

  constructor(
    @inject("UserRepository")
    private UserRepository: IUserRepository) {
  }

  async execute({
    username, address, business_name, phone, payment_day, payment_status = "paid"
  }: IRequest): Promise<void> {
    try {
      const foundUser = await this.UserRepository.findByName(username)

      if (!foundUser) {
        throw new AppError("User does not exists")
      }

      foundUser.phone = phone;
      foundUser.address = address;
      foundUser.business_name = business_name;
      foundUser.payment_day = payment_day;
      foundUser.payment_status = payment_status;

      await this.UserRepository.save(foundUser)

    } catch (error) {
      throw new AppError("Error updating service")

    }

  }
}

export { UpdateUserService };
