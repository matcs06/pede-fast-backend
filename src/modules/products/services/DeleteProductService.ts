import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IRequest {
   name: string;
   description: string;
   price: string;
}

@injectable()
class DeleteProductService {

   constructor(
      @inject("ProductsRepository")
      private productsRepository: IProductsRepository) {
   }

   async execute(id: string): Promise<void> {

      const findProduct = await this.productsRepository.findById(id)

      if (!findProduct) {
         throw new AppError("Product not found")
      }

      await this.productsRepository.deleteById(id);
   }
}

export { DeleteProductService };
