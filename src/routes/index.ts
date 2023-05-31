import { Router } from "express";

import { productsRoutes } from "./products.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes"

const router = Router()

router.use('/products', productsRoutes);
router.use("/users", usersRoutes);
router.use("/sessions", authenticateRoutes);

export { router }