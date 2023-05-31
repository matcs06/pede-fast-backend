import { inject, injectable } from 'tsyringe';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
class ListAllUsersService {

   constructor(
      @inject("UserRepository")
      private UserRepository: IUserRepository) {
    }

  async execute(): Promise<User[] | undefined>{
    return await this.UserRepository.findAll();
  }
}

export { ListAllUsersService };