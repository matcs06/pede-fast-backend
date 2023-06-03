import { inject, injectable } from 'tsyringe';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { Product } from '../../products/entities/Product';

@injectable()
class ListUserProductService {

   constructor(
      @inject("UserRepository")
      private UserRepository: IUserRepository) {
   }

   async execute(username: string): Promise<Product[] | undefined> {
      const products = this.UserRepository.findUserProducts(username);
      return products
   }
}

export { ListUserProductService };