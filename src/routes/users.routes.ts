import { Router } from 'express';

import { CreateUserController } from '../modules/users/controller/createUser/CreateUserController';

import { DeleteUserController } from '../modules/users/controller/deleteUser/DeleteUserController';

import { ListAllUsersController } from '../modules/users/controller/listAllUsers/ListAllUsersController';

import { FindUserByNameController } from '../modules/users/controller/findUserByName/FindUserByNameController';

import { UpdateUserController } from '../modules/users/controller/updateUser/UpdateUserController';

import { UpdateUserBusinessController } from '../modules/users/controller/updateUser/UpdateUserBusinessController';

import { ListUserProductController } from '../modules/users/controller/listUser/ListUserProductsController';

import { UpdateUserStoreStatusController } from '../modules/users/controller/updateUser/UpdateUserStoreStatusController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { checkUserLevel } from '../middlewares/checkUserLevel';
import multer from 'multer';
import uploadImage from '../middlewares/uploadImage';
import { deleteFile } from "../middlewares/deleteImage"
import { createDefaultFolders } from '../middlewares/createDefaultFolders';

const usersRoutes = Router();

const createUserController = new CreateUserController()
const deleteUserController = new DeleteUserController()
const listAllUserService = new ListAllUsersController()
const listUserProducts = new ListUserProductController()
const findUserByName = new FindUserByNameController()
const updateUser = new UpdateUserController();
const updateUserBusiness = new UpdateUserBusinessController();
const updateUserStoreStatus = new UpdateUserStoreStatusController();

const upload = multer(uploadImage.multer)
usersRoutes.post('/', createDefaultFolders, createUserController.handle);

usersRoutes.get("/userproducts", listUserProducts.handle)
usersRoutes.get("/:username", findUserByName.handle)
usersRoutes.get("/", listAllUserService.handle)

//usuário precisa estar autenticado
usersRoutes.patch("/updateBusiness",
   ensureAuthenticated,
   upload.single("filename"),
   updateUserBusiness.handle)

usersRoutes.patch("/updateStoreStatus/:id", ensureAuthenticated, updateUserStoreStatus.handle)

/* precisa estar logado como super para executar essas rotas */
usersRoutes.use(checkUserLevel)
usersRoutes.delete("/:id", deleteFile, deleteUserController.handle)
usersRoutes.patch("/", updateUser.handle)


export { usersRoutes };