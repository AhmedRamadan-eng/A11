
export const SuccessReseponce  =({res,message = "bone", status =200,data= undefined  }={})=>{
    return res.status(status).json({status,message,data});
    

}