import express from "express"
import { env } from "../../config/env.service.js";
import { databaseconnection } from "./../database/index.js";
import { globalErrorHandler } from "../common/utils/reseponce/index.js";
import authRouter from "./../modules/auth/auth.controller.js  "
export const bootstrap = async () => {
  const app = express();

    app.use(express.json());

  await databaseconnection();

  
  app.use("/auth",  authRouter);

  



  app.use(globalErrorHandler);

  app.listen(env.port, () => {
    console.log(`Server is running on port 3002`);
  });

};  