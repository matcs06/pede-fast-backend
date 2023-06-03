import { Product } from '../entities/Product';

interface ICreateProductDTO {
   name: string;
   description: string;
   price: string;
   user_id: string;
   enabled: boolean;
   image_url: string;
   options: [];
   quantity: string;
}

interface IProductsRepository {
   findByName(name: string): Promise<Product | undefined>;
   list(user_id: string): Promise<Product[]>;
   create({
      name, description, price, user_id, enabled, options, quantity, image_url
   }: ICreateProductDTO): Promise<void>;
   deleteById(id: string): Promise<void>;
   findById(id: string): Promise<Product | undefined>;
   save(product: Product): Promise<void>;
}

export { IProductsRepository, ICreateProductDTO };
