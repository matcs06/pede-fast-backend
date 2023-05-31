import { Product } from '../../entities/Product';
import { ICreateProductDTO, IProductsRepository } from '../IProductsRepository';

import { getRepository, Repository } from "typeorm"

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product)
  }

  /*  public static getInstance():ProductsRepository {
     if (!ProductsRepository.INSTANCE) {
       ProductsRepository.INSTANCE = new ProductsRepository();
     }
 
     return ProductsRepository.INSTANCE;
   } */

  async create({
    name, description, price, user_id, enabled, image_url
  }: ICreateProductDTO): Promise<void> {
    const product = this.repository.create({
      name,
      description,
      price,
      user_id,
      enabled,
      image_url
    })

    await this.repository.save(product)
  }

  async findByName(name: string): Promise<Product | undefined> {
    const product = await this.repository.findOne({ name });

    return product;
  }

  async list(user_id: string): Promise<Product[]> {
    const products = await this.repository.find({ user_id: user_id })
    return products;
  }

  async deleteById(id: string): Promise<void> {

    await this.repository.delete(id)

  }

  async findById(id: string): Promise<Product | undefined> {

    const product = await this.repository.findOne(id);
    return product;

  }

  public async save(product: Product): Promise<void> {
    await this.repository.save(product);
  }

}

export { ProductsRepository };
