import { Product } from '../../products/entities/Product';
import { Orders } from '../entities/Orders';

interface ICreateOrderDTO {
   customer_name: string;
   customer_address: string;
   customer_phone: string;
   adm_user_id: string;
   products_ids: string[]
   status: "opened" | "closed";
   product: string;
}

interface IOrderRepository {
   create({
      adm_user_id, customer_address, customer_name, customer_phone, status, products_ids, product
   }: ICreateOrderDTO): Promise<void>;

   findByUserId(adm_user_id: string): Promise<Orders[] | undefined>;
   save(data: Orders): Promise<void>;

   findOneById(order_id: string): Promise<Orders | undefined>

   deleteById(id: string): Promise<void>;
}

export { IOrderRepository, ICreateOrderDTO };