import { Router } from "express";
import { signup,login, getUserById} from "./auth.service.js";
import { auth } from "../../common/middleware/auth.js";
import { SuccessReseponce } from "../../common/utils/reseponce/successe.reseponce.js";
import { generateAccessToken } from "./auth.service.js";
import { validation } from "../../common/utils/validation/validation.js";
import {signupSchema ,loginSchema  } from "../auth/auth.validetion.js";
import { FILE_TYPES, multer_locel } from "../../common/middleware/multer.js";

const router = Router();
router.post('/signup', validation(signupSchema), async (req, res) => {
    let userAdded = await signup(req.body);

    return SuccessReseponce({
        res,
        message: "user added",
        status: 201,
        data: userAdded
    });
});
router.post("/login",validation(loginSchema),async(req,res)=>{
    const loginuser=await login(req.body)

     return SuccessReseponce({
        res,
        message: "user login",
        status: 200,
        data: loginuser
    });
})
router.post("/upload",
    multer_locel({ custompath: "profileImages" }).single("image"),
    (req, res) => {

        req.file.finalpath = `${req.file.destination}/${req.file.filename}`;
res.status(200).json({
  file:req.file,
  body: req.body
})
 
    }
);

router.post("/profile-image",
    multer_locel({ custompath: "images/user/profileIamges", allowedExtintions: FILE_TYPES.images }).single("image"),
    async (req, res) => {
console.log(req.file.size);
console.log(req.file.path);
        console.log(req.body);
        console.log(req.file);

        res.status(200).json({
            file: req.file,
            body: req.body,
            mes: "done"
        });
    }
);

// import multer from "multer";

// const upload = multer({ dest: "uploads/" });

// router.post("/upload",
//   upload.single("image"),
//   (req, res) => {
//     // console.log(req.file);

//     res.json({
//       file: req.file,
//       body: req.body
//     });
//   }
// );






router.get("/get-user-by-id", auth ,async (req, res) => {
  const userdata = await getUserById(req.userId);

  return SuccessReseponce({
    res,
    message: "User fetched successfully",
    status: 200,
    data: userdata
  });
});


router.get("/generate_access_token",async (req,res)=>{
  let {authorization}=req.headers;
  let accesstoken=await generateAccessToken(authorization)
    return SuccessReseponce({
        res,
        message: "access token ceated",
        status: 200,
        accesstoken
    });
})

export default router;