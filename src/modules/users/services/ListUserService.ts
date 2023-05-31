import { inject, injectable } from 'tsyringe';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
class ListUserService {

   constructor(
      @inject("UserRepository")
      private UserRepository: IUserRepository) {
    }

  async execute(id:string): Promise<User | undefined>{
    return await this.UserRepository.findById(id);
  }
}

export { ListUserService };