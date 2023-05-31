import { inject, injectable } from 'tsyringe';
import { Product } from '../entities/Product';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  description: string;
  price: string;
}

@injectable()
class ListSingleProductService {

  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository) {
  }

  async execute(id: string): Promise<Product> {
    const foundProduct = await this.productsRepository.findById(id);

    if (!foundProduct) {
      throw new Error("Produc does not exists")
    }

    return foundProduct
  }
}

export { ListSingleProductService };