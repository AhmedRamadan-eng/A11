
import { BadRequestException } from "../reseponce/index.js";

export const validation = (Schema) => {
  return (req, res, next) => {
  let { value, error } = Schema.validate(req.body, { abortEarly: false });

  if (error) {
    throw BadRequestException({
      message: "validation error",
      extra: error.details,
    });
  }

  next();
};
 
}