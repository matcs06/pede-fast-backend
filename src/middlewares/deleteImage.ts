
import path from 'path';
import { NextFunction, Request, Response } from "express"
//import { ProductsRepository } from "../modules/products/repositories/implementations/ProductsRepository";
import { UserRepository } from '../modules/users/repositories/implementations/UserRepository';

import { AppError } from '../shared/errors/AppError';
import { existsSync, unlink } from "fs"
import { ProductsRepository } from '../modules/products/repositories/implementations/ProductsRepository';

//Apenas usada para deletar imagens de produtos e usuários 

export async function deleteFile(request: Request, response: Response, next: NextFunction) {


   let image_from = String(request.query.image_from) // "user" or "product"

   if (image_from == "user") {
      const user_id = String(request.query.id)

      const userRepository = new UserRepository()
      const userToDelete = await userRepository.findById(user_id)

      if (!userToDelete) {
         throw new AppError("Product does not exists!")
      }

      const dest = path.resolve(__dirname, '..', '..', 'images', "users", userToDelete.username, "profile")

      let image_url = userToDelete.business_image_url
      if (userToDelete.business_image_url === "" || userToDelete.business_image_url === null) {
         image_url = "nothing.png"
      }

      const fileToDelete = path.resolve(dest, image_url)

      /* Verifica se o diretório com o nome do usuário não existe, caso nao, cria */
      if (!existsSync(fileToDelete)) {
         next()
      } else {
         unlink(fileToDelete, (err) => {
            if (err) {
               console.error(err);
            } else {
               console.log("File removed!");
            }
         })
         next()
      }
   }


   if (image_from == "product") {
      let user_name = String(request.query.user_name)
      const id = String(request.query.id)

      if (!user_name) {
         user_name = "nouser"
      }

      const productsRepository = new ProductsRepository()
      const productToDelete = await productsRepository.findById(id)

      if (!productToDelete) {
         throw new AppError("Product does not exists!")
      }

      const dest = path.resolve(__dirname, '..', '..', 'images', "users", user_name)

      let image_url = productToDelete.image_url
      if (productToDelete.image_url === "" || productToDelete.image_url === null) {
         image_url = "nothing.png"
      }

      const fileToDelete = path.resolve(dest, image_url)

      /* Verifica se o diretório com o nome do usuário não existe, caso nao, cria */
      if (!existsSync(fileToDelete)) {
         next()
      } else {
         unlink(fileToDelete, (err) => {
            if (err) {
               console.error(err);
            } else {
               console.log("File removed!");
            }
         })
         next()
      }
   }

}