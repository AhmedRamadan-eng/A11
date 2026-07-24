import { env } from "../../../config/index.js"
import { ErrorResponse } from "../utils/reseponce/index.js";
import jwt from "jsonwebtoken"


 export const generateToken = (user)=>{
let signature = undefined;
  let audience = undefined;
  let refreshsignature=undefined
  if (user.role == 0) {
    signature = env.usersignature;
    refreshsignature = env.UserRefresh;
    audience = "user";
  } else {
    signature = env.Adminsignature;
    refreshsignature = env.AdminRefresh;
    audience = "Admin";
  }

  const accesstoken = jwt.sign(
    { id: user._id },
    signature,
    {
      expiresIn: "30m",
      audience
    }
  );

  const refreshtoken = jwt.sign(
    { id: user._id },
    refreshsignature,
    {
      expiresIn: "1y",
      audience
    }
  );

  return { accesstoken, refreshtoken };
 




 }

export const decodedToken = (token) => {
 if (!token) {
   return ErrorResponse({ message: "Missing token"});
}

  let decoded = jwt.decode(token);

  if (!decoded) {
    throw ErrorResponse({message:"Invalid token"});
  }
  let signature = undefined;

  switch (decoded.aud) {

    case "Admin":
      signature = env.Adminsignature;
      break;

    case "user":
    default:
      signature = env.usersignature;
      break;
  }

  let decodedData = jwt.verify(token, signature);

  return decodedData;
}


 
export const decodedRefreshToken = (token, decoded) => {

  let refreshsignature = undefined;

  switch (decoded.aud) {

    case "Admin":
      refreshsignature = env.AdminRefresh;
      break;

    case "user":
    default:
      refreshsignature = env.UserRefresh;
      break;
  }

  let decodedData = jwt.verify(token, refreshsignature);

  return decodedData;
}