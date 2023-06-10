import { Router } from "express";

import { productsRoutes } from "./products.routes";
import { usersRoutes } from "./users.routes";
import { deliveryRoutes } from "./delivery.routes";
import { authenticateRoutes } from "./authenticate.routes"
import { orderRoutes } from "./order.routes";

const router = Router()

router.use('/products', productsRoutes);
router.use("/users", usersRoutes);
router.use("/sessions", authenticateRoutes);
router.use("/delivery", deliveryRoutes)
router.use("/order", orderRoutes)

export { router }