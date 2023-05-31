import { inject, injectable } from 'tsyringe';
import { Product } from '../entities/Product';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  description: string;
  price: string;
}

@injectable()
class ListProductsService {

  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository) {
  }

  async execute(user_id: string): Promise<Product[]> {
    return await this.productsRepository.list(user_id);
  }
}

export { ListProductsService };
