import express from 'express';
import { createPost, deletePost, getAllpost, getPostById } from '../controllers/post.controllers.js';
import verifyJWT from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const postRouter = express.Router();

postRouter.route("/create-post").post(verifyJWT,
    upload.single("postImage"),
    createPost);

postRouter.route("/delete-post/:postId").delete(verifyJWT, deletePost);

postRouter.route("/get-posts").get(getAllpost);

postRouter.route("/get-post/:postId").get( getPostById );

export default postRouter;
