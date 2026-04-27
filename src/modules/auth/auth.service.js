import { UserModel } from "../../models/user.models.js";
import { ConflictException, NotFoundException,UnauthorizedException } from "../../common/utils/reseponce/error.reseponce.js";
import { ProviderEnums } from "../../common/enums/enms.service.js";
import { findById, findOne } from "../../models/database.service.js";
import { hash,compare } from "bcrypt";
import { env } from "../../../config/env.service.js";
import jwt from "jsonwebtoken"
export const signup = async (data) => {
  const { userName, email, password, phone, provider, gender} = data;

 const existuser = await findOne({
  model: UserModel,
  filter: { email },
  select: "password"
});

  if (existuser) {
    return ConflictException({ message: "Email already exists" });
  }
 let hashedpassword = await hash(password, Number(env.SALT));
  let addeduser= await UserModel.insertOne({userName,email,password:hashedpassword})
return addeduser
 
  
 
};
export const login = async (data) => {
  const { email, password } = data;

  const existuser = await findOne({
  model: UserModel,
  filter: {
    email,   
    provider: ProviderEnums.System
  }
});

  if (existuser) {
    
    
    const ismatched=await compare(password,existuser.password)
    let token= jwt.sign({id :existuser},"route",{expiresIn:"1d"})

     
    return {existuser,token}
    
  }

  return NotFoundException({ message: "user not found"});
};

export const getUserById = async (headers) => {
  let { authorization } = headers;
if(!authorization){
  UnauthorizedException("unauthoriza")
}
  let decoded = jwt.verify(authorization, "route");

  console.log(decoded.id);

  let userData = await findById({ model: UserModel, id: decoded.id });

  return userData;
};  