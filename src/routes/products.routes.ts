import { Router } from 'express';

import { CreateProductController } from '../modules/products/controller/createProduct/CreateProductController';

import { ListProductController } from '../modules/products/controller/listProduct/ListProductController';

import { DeleteProductController } from '../modules/products/controller/deleteProduc/DeleteProductController';

import { ListSingleProductController } from '../modules/products/controller/listSingleProduct/ListSingleProductController';

import { UpdateProductController } from '../modules/products/controller/updateProduct/UpdateProductController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import uploadImage from '../middlewares/uploadImage';
import { deleteFile } from "../middlewares/deleteImage"
import multer from 'multer';

const productsRoutes = Router();

const createProductController = new CreateProductController()
const listProductController = new ListProductController
const deleteProductController = new DeleteProductController()
const listSingleProductController = new ListSingleProductController()
const updateProductController = new UpdateProductController()
const upload = multer(uploadImage.multer)

productsRoutes.get('/', listProductController.handle);

productsRoutes.get("/:id", listSingleProductController.handle)

productsRoutes.use(ensureAuthenticated)

productsRoutes.post('/',
   upload.single("filename"),
   createProductController.handle);

productsRoutes.delete("/:id",
   deleteFile,
   deleteProductController.handle)

productsRoutes.patch("/:id", updateProductController.handle)

export { productsRoutes };
