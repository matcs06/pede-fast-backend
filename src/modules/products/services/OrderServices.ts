import { inject, injectable } from "tsyringe"
import { IOrderRepository, ICreateOrderDTO as IRequest } from '../repositories/IOrderRepository';
import { hash } from "bcrypt"
import { IProductsRepository } from "../repositories/IProductsRepository";
import { Orders } from "../entities/Orders";
import { AppError } from "../../../shared/errors/AppError";

interface IUpdateOrder {
   order_id: string;
   status: "opened" | "closed"
}

@injectable()
class OrderService {

   constructor(
      @inject("OrderRepository")
      private OrderRepository: IOrderRepository,

      @inject("ProductsRepository")
      private productsRepository: IProductsRepository,


   ) { }

   //products_ids deve ser passado no seguinte formato id | quantidade do produto, ex: 123asdas-12312asdas-12312asdas | 3
   async execute({
      adm_user_id, customer_address, customer_name, customer_phone, status, products_ids, product
   }: IRequest): Promise<void> {

      await this.updateProductsStock(products_ids)


      await this.OrderRepository.create({ adm_user_id, customer_address, customer_name, customer_phone, products_ids, status, product })
   }


   async updateProductsStock(products_ids: string[]): Promise<void> {
      //lógica para atualizar stoque dos produtos
      products_ids.map(async (product_id) => {
         const idOnly = product_id.split("|")[0].trim()   // separando o id do produto
         const quantityOnly = product_id.split("|")[1].trim() //separando a quantidade do produto
         const product = await this.productsRepository.findById(idOnly)

         if (product) {

            if (Number(product.quantity) < Number(quantityOnly)) {
               throw new AppError("Quantity not available for your order, try again")
            }
            const updatedQuantity = Number(product.quantity) - Number(quantityOnly)

            product.quantity = String(updatedQuantity)

            await this.productsRepository.save(product)
         }
      })


   }

   async listOrders(adm_user_id: string): Promise<Orders[] | undefined> {
      const orders = await this.OrderRepository.findByUserId(adm_user_id)

      return orders;
   }

   async deleteOrder(order_id: string): Promise<void> {
      const orderExist = await this.listOrders(order_id)

      if (!orderExist) {
         throw new AppError("Order does not exists!")
      }

      await this.OrderRepository.deleteById(order_id)
   }

   async updateOrder({ order_id, status }: IUpdateOrder): Promise<void> {
      const order = await this.OrderRepository.findOneById(order_id)

      if (!order) {
         throw new AppError("Order does not exists")
      } else {
         order.status = status

         await this.OrderRepository.save(order)

      }

   }

}

export { OrderService };