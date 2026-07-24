import { UserModel } from "../../models/user.models.js";
import { ConflictException, NotFoundException,UnauthorizedException } from "../../common/utils/reseponce/error.reseponce.js";
import { ProviderEnums } from "../../common/enums/enms.service.js";
import { findById, findOne } from "../../models/database.service.js";
import { hash,compare } from "bcrypt";
import { env } from "../../../config/index.js"
import jwt from "jsonwebtoken"
import { decodedRefreshToken, generateToken } from "../../common/security/security.js";
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

  let {accesstoken,refreshtoken}= generateToken(existuser)

  const ismatched = await compare(password, existuser.password);

  if (ismatched) {
    
    return { existuser,accesstoken,refreshtoken }; 
  }}

  return NotFoundException({ message: "user not found" });
};



export const getUserById = async (userId) => {
  
    

    let userData = await findById({
      model: UserModel,
      id: userId
    });

    return userData;

  
  
};


export const generateAccessToken = async (token) => {

  let decoded = jwt.decode(token);

  if (!decoded) {
    throw new Error("Invalid token");
  }

  let decodedData = decodedRefreshToken(token, decoded);

  let signature;

  switch (decodedData.aud) {

    case "Admin":
      signature = env.Adminsignature;
      break;

    case "user":
    default:
      signature = env.usersignature;
      break;
  }

  return jwt.sign(
    { id: decodedData.id },
    signature,
    {
      expiresIn: "30m",
      audience: decodedData.aud
    }
  );
};