
import joi from "joi";

export const signupSchema =joi.object ({
   userName: joi.string().min(6).max(50),
   email:     joi.string().email().required(),
   password: joi.string().min(3).max(30).alphanum().required(),
     gender: joi.string().optional(),
user:joi.array().items(joi.string()).required
})


export const loginSchema =joi.object ({
 
   email:     joi.string().email().required(),
   password: joi.string().min(3).max(30).alphanum().required(),
  

})