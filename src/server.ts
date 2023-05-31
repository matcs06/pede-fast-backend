import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors"
import "./shared/container"
import cors from 'cors';
import path from 'path';


import { router } from './routes';
import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import { createConnection } from "typeorm";
import { AppError } from "./shared/errors/AppError";

createConnection()

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  '/files', express.static(path.resolve(__dirname, "../images/users/"))
)

app.use(express.json());
app.use(router)


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
})

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.listen(3333, () => {
  console.log('Server running on 3333');
});
