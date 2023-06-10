import { container, delay } from "tsyringe"

import { ProductsRepository } from "../../modules/products/repositories/implementations/ProductsRepository"
import { IProductsRepository } from "../../modules/products/repositories/IProductsRepository"

import { UserRepository } from "../../modules/users/repositories/implementations/UserRepository"
import { IUserRepository } from "../../modules/users/repositories/IUserRepository"

import { DeliveryRepository } from "../../modules/users/repositories/implementations/DeliveryRepository"
import { IDeliveryRepository } from "../../modules/users/repositories/IDeliveryRepository"

import { OrderRepository } from "../../modules/products/repositories/implementations/OrderRepository"
import { IOrderRepository } from "../../modules/products/repositories/IOrderRepository"

container.registerSingleton<IProductsRepository>(
   "ProductsRepository", ProductsRepository
)

container.registerSingleton<IUserRepository>(
   "UserRepository",
   delay(() => UserRepository)
)

container.registerSingleton<IDeliveryRepository>(
   "DeliveryRepository", DeliveryRepository
)

container.registerSingleton<IOrderRepository>(
   "OrderRepository", OrderRepository
)