import { Router } from 'express';

import { CreateUserController } from '../modules/users/controller/createUser/CreateUserController';

import { DeleteUserController } from '../modules/users/controller/deleteUser/DeleteUserController';

import { ListUserController } from '../modules/users/controller/listUser/ListUserController';

import { ListAllUsersController } from '../modules/users/controller/listAllUsers/ListAllUsersController';

import { FindUserByNameController } from '../modules/users/controller/findUserByName/FindUserByNameController';

import { UpdateUserController } from '../modules/users/controller/updateUser/UpdateUserController';

import { UpdateUserBusinessController } from '../modules/users/controller/updateUser/UpdateUserBusinessController';

import { checkUserLevel } from '../middlewares/checkUserLevel';
import multer from 'multer';
import uploadImage from '../middlewares/uploadImage';

const usersRoutes = Router();

const createUserController = new CreateUserController()
const deleteUserController = new DeleteUserController()
const listUserController = new ListUserController()
const listAllUserService = new ListAllUsersController()
const findUserByName = new FindUserByNameController()
const updateUser = new UpdateUserController();
const updateUserBusiness = new UpdateUserBusinessController();
const upload = multer(uploadImage.multer)

usersRoutes.post('/', createUserController.handle);

usersRoutes.get("/:username", findUserByName.handle)
usersRoutes.get("/:id", listUserController.handle)
usersRoutes.get("/", listAllUserService.handle)

usersRoutes.patch("/updateBusiness",
   upload.single("filename"),
   updateUserBusiness.handle)

usersRoutes.use(checkUserLevel)
usersRoutes.delete("/:id", deleteUserController.handle)
usersRoutes.patch("/", updateUser.handle)

export { usersRoutes };