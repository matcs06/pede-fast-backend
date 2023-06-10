import { Router } from 'express';

import { CreateOrderController } from "../modules/products/controller/createOrder/CreateOrderController"


import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const orderRoutes = Router();

const createOrder = new CreateOrderController()

orderRoutes.use(ensureAuthenticated)
orderRoutes.post("/", createOrder.handle)

export { orderRoutes };