import { Router } from "express";
import { signup,login, getUserById} from "./auth.service.js";
import { SuccessReseponce } from "../../common/utils/reseponce/successe.reseponce.js";
const router = Router();
router.post('/signup', async (req, res) => {
    let userAdded = await signup(req.body);

    return SuccessReseponce({
        res,
        message: "user added",
        status: 201,
        data: userAdded
    });
});
router.post("/login",async(req,res)=>{
    const loginuser=await login(req.body)

     return SuccessReseponce({
        res,
        message: "user login",
        status: 200,
        data: loginuser
    });
})

router.get("/get-user-by-id", async (req, res) => {
  const userdata = await getUserById(req.headers);

  return SuccessReseponce({
    res,
    message: "User fetched successfully",
    status: 200,
    data: userdata
  });
});

export default router;