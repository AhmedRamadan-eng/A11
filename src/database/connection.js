import mongoose from "mongoose";
import { env } from "../../config/env.service.js";
console.log(env.mongoURL);
export const databaseconnection =async()=>{
    await mongoose.connect(env.mongoURL).then(()=>{
        console.log("Connected database");
        
    }).catch((error)=>{
        console.log(error);
        
    })
}