import { inject, injectable } from 'tsyringe';
import { Delivery } from '../entities/Delivery';
import { IDeliveryRepository } from '../repositories/IDeliveryRepository';

@injectable()
class ListDeliveryConfigService {

   constructor(
      @inject("DeliveryRepository")
      private DeliveryRepository: IDeliveryRepository) {
   }

   async execute(user_id: string): Promise<Delivery | undefined> {
      const delivery = this.DeliveryRepository.findByUserId(user_id);
      return delivery
   }
}

export { ListDeliveryConfigService };