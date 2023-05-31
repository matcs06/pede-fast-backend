import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { IUserRepository } from '../repositories/IUserRepository';

interface IRequest{
   name:string;
   description:string;
   price: string;
   duration:string;
}

@injectable()
class DeleteUserService {

  constructor(
    @inject("UserRepository")
    private UserRepository: IUserRepository) {
  }

  async execute(id:string): Promise<void> {

     const findUser = await this.UserRepository.findById(id)

     if(!findUser){
        throw new AppError("User not found")
     }

     await this.UserRepository.deleteById(id);
  }
}

export { DeleteUserService };
