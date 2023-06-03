import { inject, injectable } from "tsyringe"
import { IDeliveryRepository } from '../repositories/IDeliveryRepository';
import { hash } from "bcrypt"

interface IRequest {

   tax: string;
   has_discount: boolean;
   condition: string;
   parameter: string;
   discount_percentage: string;
   user_id: string;
}

@injectable()
class CreateDeliveryConfigService {

   constructor(
      @inject("DeliveryRepository")
      private DeliveryRepository: IDeliveryRepository) {
   }

   async execute({
      tax, user_id, condition, discount_percentage, has_discount, parameter
   }: IRequest): Promise<void> {
      const foundDeliveryConfig = await this.DeliveryRepository.findByUserId(user_id)

      if (foundDeliveryConfig) {
         foundDeliveryConfig.condition = condition;
         foundDeliveryConfig.tax = tax;
         foundDeliveryConfig.discount_percentage = discount_percentage;
         foundDeliveryConfig.has_discount = has_discount;
         foundDeliveryConfig.parameter = parameter

         this.DeliveryRepository.save(foundDeliveryConfig)
      } else {
         await this.DeliveryRepository.create({
            tax, has_discount, condition, parameter, discount_percentage, user_id
         });
      }
   }
}

export { CreateDeliveryConfigService };