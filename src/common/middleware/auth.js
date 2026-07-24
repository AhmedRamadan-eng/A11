import { env } from "../../../config/index.js";
import { decodedToken } from "../../common/security/security.js";
import { UnauthorizedException } from "../utils/reseponce/error.reseponce.js";
import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {

  let { authorization } = req.headers;
  
  if (!authorization) {
    return UnauthorizedException("unauthorized");
  }

  const [flag, token] = authorization.split(" ");
console.log(token);


  switch (flag) {

    case "Basic":

      let data = Buffer.from(token, "base64").toString();
      console.log(data);

      let [email, password] = data.split(":");
      console.log(email, " ", password);

      break;

    case "Bearer":

      let decodedData = decodedToken(token);
      req.userId = decodedData.id;

      next();
   

    default:
    break;
  }


};