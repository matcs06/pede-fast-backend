
import path from 'path';
import { NextFunction, Request, Response } from "express"
import { existsSync, mkdir, unlink } from "fs"

//funcao para criacao de pastas na acao da criacao do usuario

export async function createDefaultFolders(request: Request, response: Response, next: NextFunction) {

   let user_name = String(request.body.username)

   const dest = path.resolve(__dirname, '..', '..', 'images', "users", user_name, "profile")


   if (!existsSync(dest)) {

      mkdir(dest, { recursive: true }, function (err: any) {

         if (err) {
            console.log(err)
         } else {
            console.log("New directory successfully created.")
         }
      })
   }

   next()
}