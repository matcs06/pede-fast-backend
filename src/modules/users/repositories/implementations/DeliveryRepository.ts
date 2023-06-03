import { getRepository, Repository } from "typeorm";
import { Delivery } from "../../entities/Delivery";
import { ICreateDeliveryDTO, IDeliveryRepository } from "../IDeliveryRepository";

class DeliveryRepository implements IDeliveryRepository {
   private respository: Repository<Delivery>

   constructor() {
      this.respository = getRepository(Delivery)
   }

   async deleteById(id: string): Promise<void> {

      await this.respository.delete(id)

   }

   async create({ tax, has_discount, discount_percentage, condition, parameter, user_id }: ICreateDeliveryDTO): Promise<void> {
      const user = this.respository.create({
         tax, has_discount, discount_percentage, condition, parameter, user_id
      })

      await this.respository.save(user)

   }

   async findByUserId(user_id: string): Promise<Delivery | undefined> {
      const user = await this.respository.findOne({ user_id })

      return user;
   }




   public async save(data: Delivery): Promise<void> {
      await this.respository.save(data);
   }

}

export { DeliveryRepository }