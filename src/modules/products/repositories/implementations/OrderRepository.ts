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

   async create({ adm_user_id, customer_address, customer_name, customer_phone, status, product }: ICreateOrderDTO): Promise<void> {
      const order = this.respository.create({
         adm_user_id, customer_address, customer_name, customer_phone, status, product
      })

      await this.respository.save(order)

   }


   async findByUserId(adm_user_id: string): Promise<Orders[] | undefined> {
      const orders = await this.respository.find({ adm_user_id })

      return orders;
   }

   async findOneById(order_id: string): Promise<Orders | undefined> {
      const order = await this.respository.findOne(order_id)

      return order;
   }

   public async save(data: Orders): Promise<void> {
      await this.respository.save(data);
   }

}

export { OrderRepository }