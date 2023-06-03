import { IProductsRepository } from '../repositories/IProductsRepository';
import { inject, injectable } from "tsyringe"
import { AppError } from '../../../shared/errors/AppError';
import { Product } from '../entities/Product';

interface IRequest {
  id: string;
  name: string;
  description: string;
  price: string;
  enabled: string;
  quantity: string;
  filename: string;
}

@injectable()
class UpdateProductService {

  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository) {
  }

  async execute({
    id, name, description, price, quantity, enabled, filename
  }: IRequest): Promise<void> {
    try {
      const productAlreadyExists = await this.productsRepository.findById(id)

      if (!productAlreadyExists) {
        throw new AppError("There is not a product with this id")
      }

      productAlreadyExists.name = name;
      productAlreadyExists.price = price;
      productAlreadyExists.description = description;
      productAlreadyExists.enabled = enabled == "true" ? true : false;
      productAlreadyExists.quantity = quantity;
      productAlreadyExists.image_url = filename;

      await this.productsRepository.save(productAlreadyExists)

    } catch (error) {
      throw new AppError("Error updating service")
    }

  }
}

export { UpdateProductService };
