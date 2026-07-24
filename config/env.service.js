import dotenv from "dotenv";
dotenv.config({path:"./config/.env"});

const mongoURL = process.env.MONGO_URL;
const mood = process.env.MOOD;
const port = process.env.PORT;
const SALT = process.env.SALT;
const jwt_key = process.env.jwt_key;

const usersignature = process.env.user_signature;
const Adminsignature = process.env.Admin_signature;
const UserRefresh = process.env.User_REFRESH_signature;
const AdminRefresh = process.env.Admin_REFRESH_signature;

export const env = {
  port,
  mood,
  mongoURL,
  SALT,
  jwt_key,
  usersignature,
  Adminsignature,
  AdminRefresh,
  UserRefresh
};


