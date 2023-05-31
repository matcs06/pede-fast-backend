import { inject, injectable } from 'tsyringe';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
class FindUserByNameService {

   constructor(
      @inject("UserRepository")
      private UserRepository: IUserRepository) {
    }

  async execute(username:string): Promise<User | undefined>{
    return await this.UserRepository.findByName(username);
  }
}

export { FindUserByNameService };