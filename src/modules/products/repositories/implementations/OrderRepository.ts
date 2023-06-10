import { getRepository, Repository } from "typeorm";
import { Orders } from "../../entities/Orders";
import { ICreateOrderDTO, IOrderRepository } from "../IOrderRepository";

class OrderRepository implements IOrderRepository {
   private respository: Repository<Orders>

   constructor() {
      this.respository = getRepository(Orders)
   }

   async deleteById(id: string): Promise<void> {

      await this.respository.delete(id)

   }

   async create({ adm_user_id, customer_address, customer_name, customer_phone, status }: ICreateOrderDTO): Promise<void> {
      const order = this.respository.create({
         adm_user_id, customer_address, customer_name, customer_phone, status,
      })

      await this.respository.save(order)

   }

   async findByUserId(adm_user_id: string): Promise<Orders | undefined> {
      const user = await this.respository.findOne({ adm_user_id })

      return user;
   }




   public async save(data: Orders): Promise<void> {
      await this.respository.save(data);
   }

}

export { OrderRepository }