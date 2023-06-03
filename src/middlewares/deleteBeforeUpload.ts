
import path from 'path';
import { Request } from "express"
import { ProductsRepository } from "../modules/products/repositories/implementations/ProductsRepository";
import { UserRepository } from '../modules/users/repositories/implementations/UserRepository';

import { AppError } from '../shared/errors/AppError';
import { existsSync, unlink } from "fs"

export async function deleteFile(request: Request) {


   let image_from = String(request.body.image_from)

   if (image_from == "user") {


      let user_name = String(request.body.username)
      const user_id = String(request.body.user_id)

      if (!user_name) {
         user_name = "nouser"
      }

      const userRepository = new UserRepository()
      const userToDelete = await userRepository.findById(user_id)

      if (!userToDelete) {
         throw new AppError("User does not exists!")
      }

      const dest = path.resolve(__dirname, '..', '..', 'images', "users", user_name)
      console.log(dest)

      let image_url = userToDelete.business_image_url
      if (userToDelete.business_image_url === "" || userToDelete.business_image_url === null) {
         image_url = "nothing.png"
      }

      const fileToDelete = path.resolve(dest, image_url)

      // Verifica se o o arquivo a deletar existe 
      if (existsSync(fileToDelete)) {
         unlink(fileToDelete, (err) => {
            if (err) {
               console.error(err);
            } else {
               console.log("File removed!");
            }
         })

      }


   }


   if (image_from == "product") {
      let user_name = String(request.body.username)
      const id = request.body.product_id

      if (!user_name) {
         user_name = "nouser"
      }

      try {
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

         // Verifica se o o arquivo a deletar existe 
         if (existsSync(fileToDelete)) {

            unlink(fileToDelete, (err) => {
               if (err) {
                  console.error(err);
               } else {
                  console.log("File removed!");
               }
            })

         }
      } catch (error) {
         console.log(error)
      }



   }


}