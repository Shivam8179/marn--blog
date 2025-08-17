import express from 'express';
import { changePassword, updateDetail, deleteUser, udateUserImage} from "../controllers/user.controller.js"
import verifyJWT from '../middlewares/auth.middleware.js';


const userRouter = express.Router();


userRouter.route("/update-details").patch(verifyJWT,updateDetail)

userRouter.route("/change-password").post( verifyJWT,changePassword)

userRouter.route("/update-userImage").patch(udateUserImage)

userRouter.route("/delete-user").delete(verifyJWT,deleteUser)

export default userRouter;