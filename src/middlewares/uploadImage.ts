const { existsSync, mkdir } = require('fs')
import { UserRepository } from "../modules/users/repositories/implementations/UserRepository";

import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';
import { deleteFile } from "./deleteBeforeUpload";

interface IUploadConfig {

   multer: {
      storage: StorageEngine;
   };

}


export default {

   multer: {

      storage: multer.diskStorage({

         async destination(request, file, callback) {
            if (request.body.update_image == "yes") {
               await deleteFile(request)

               let userName: string | undefined = "WithoutUser"
               const user_id = request.body.user_id
               const userRepository = new UserRepository()
               const user = await userRepository.findById(user_id)

               userName = user?.username
               if (userName === undefined) {
                  userName = "WithoutUser"
               }

               let image_from = String(request.body.image_from)
               let dest = ""
               if (image_from == "user") {
                  dest = path.resolve(__dirname, '..', "..", 'images', "users", userName, "profile")
                  /* Verifica se o diretório com o nome do usuário não existe, caso nao, cria */
                  if (!existsSync(dest)) {

                     await mkdir(dest, { recursive: true }, function (err: any) {
                        if (err) {
                           console.log(err)
                        } else {
                           console.log("New directory successfully created.")
                        }
                     })
                  }
               } else {
                  dest = path.resolve(__dirname, '..', "..", 'images', "users", userName)

                  /* Verifica se o diretório com o nome do usuário não existe, caso nao, cria */
                  if (!existsSync(dest)) {

                     await mkdir(dest, { recursive: true }, function (err: any) {
                        if (err) {
                           console.log(err)
                        } else {
                           console.log("New directory successfully created.")
                        }
                     })
                  }
               }

               return callback(null, dest)
            }


         },
         filename(request, file, callback) {
            if (request.body.update_image == "yes") {
               const fileHash = crypto.randomBytes(10).toString("hex");
               const fileName = `${fileHash}-${file.originalname}`;

               return callback(null, fileName);
            }
         },
      }),

   },
} as IUploadConfig;