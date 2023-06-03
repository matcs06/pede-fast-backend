import { Router } from 'express';

import { CreateDeliveryConfigController } from "../modules/users/controller/createDeliveryConfig/CreateDeliveryController"
import { ListDeliveryConfigController } from '../modules/users/controller/listDeliveryConfig/ListDeliveryConfigController';


import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const deliveryRoutes = Router();

const createDeliveryConfig = new CreateDeliveryConfigController()
const listDeliveryConfig = new ListDeliveryConfigController()

deliveryRoutes.use(ensureAuthenticated)
deliveryRoutes.post("/", createDeliveryConfig.handle)
deliveryRoutes.get("/:user_id", listDeliveryConfig.handle)

export { deliveryRoutes };