import { Router } from 'express';

import { CreateOrderController } from "../modules/products/controller/createOrder/CreateOrderController"
import { ListOrderController } from '../modules/products/controller/listOrder/ListOrderController';
import { DeleteOrderController } from '../modules/products/controller/deleteOrder/DeleteOrderController';
import { UpdateOrderController } from '../modules/products/controller/updateOrder/UpdateOrderController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const orderRoutes = Router();

const createOrder = new CreateOrderController()
const listOrder = new ListOrderController()
const deleteOrder = new DeleteOrderController()
const updateOrder = new UpdateOrderController()

orderRoutes.use(ensureAuthenticated)
orderRoutes.post("/", createOrder.handle)
orderRoutes.get("/", listOrder.handle)
orderRoutes.delete("/", deleteOrder.handle)
orderRoutes.patch("/", updateOrder.handle)

export { orderRoutes };