import dotenv from "dotenv";
dotenv.config({path:"./config/.env"});
const mongoURL=process.env.MONGO_URL;
const mood=process.env.MOOD;
const port=process.env.PORT;
const SALT=process.env.SALT
export const env ={port,mood,mongoURL,SALT}