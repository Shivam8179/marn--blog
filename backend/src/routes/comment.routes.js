import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { createComment, deleteComment, getComment } from "../controllers/comment.controllers.js"

const commentRouter = express.Router()

commentRouter.route("/create-comment").post(verifyJWT,createComment)

commentRouter.route("/delete-comment/:postId").delete( verifyJWT,deleteComment)

commentRouter.route("/get-comment/:postcomment").get(getComment)

export default commentRouter;