import { IProductsRepository } from '../repositories/IProductsRepository';
import { inject, injectable } from "tsyringe"
import { AppError } from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  price: string;
  user_id: string;
  image_url: string;
  options: any;
  quantity: string;
}

@injectable()
class CreateProductService {

  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository) {
  }


  async execute({
    name, description, price, user_id, options, quantity, image_url,
  }: IRequest): Promise<void> {
    try {
      const productAlreadyExists = await this.productsRepository.findByName(name)

      if (productAlreadyExists) {
        throw new AppError("Product already exists")
      }


      const enabled = true;
      await this.productsRepository.create({
        name, description, price, user_id, enabled, options, quantity, image_url
      });


    } catch (error) {
      console.log(error)
    }

  }
}

export { CreateProductService };
