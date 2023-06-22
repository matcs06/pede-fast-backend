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
  update_image: string
}

interface IUpdateProduct {
  id: string;
  quantity: string;
  enabled: boolean
}

@injectable()
class UpdateProductService {

  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository) {
  }

  async execute({
    id, name, description, price, quantity, enabled, update_image, filename
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
      if (update_image === "yes") {
        productAlreadyExists.image_url = filename
      }

      await this.productsRepository.save(productAlreadyExists)

    } catch (error) {
      throw new AppError("Error updating service")
    }

  }

  async updateProductStockOrAvailability({ id, quantity, enabled }: IUpdateProduct) {
    const foundProduct = await this.productsRepository.findById(id)

    if (!foundProduct) {
      throw new AppError("There is not a product with this id")
    }

    foundProduct.quantity = quantity
    foundProduct.enabled = enabled
    await this.productsRepository.save(foundProduct)

  }
}

export { UpdateProductService };
