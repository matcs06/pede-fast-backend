import { Product } from '../../products/entities/Product';
import { Delivery } from '../entities/Delivery';

interface ICreateDeliveryDTO {
   tax: string;
   has_discount: boolean;
   condition: string;
   parameter: string;
   discount_percentage: string;
   user_id: string;
}

interface IDeliveryRepository {
   create({
      condition, discount_percentage, has_discount, parameter, tax, user_id
   }: ICreateDeliveryDTO): Promise<void>;

   findByUserId(user_id: string): Promise<Delivery | undefined>;
   save(data: Delivery): Promise<void>;

   deleteById(id: string): Promise<void>;
}

export { IDeliveryRepository, ICreateDeliveryDTO };