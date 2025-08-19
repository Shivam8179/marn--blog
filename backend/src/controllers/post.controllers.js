
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Post from "../models/post.model.js";
import { request } from "express";

const createPost = async(req, res) => {
    try {
        const { title, content } = req.body;
        if(!title|| !content){
            throw new ApiError(404,"All field are required");
        }
        
        const postImagePath = req.file?.path;

        if(!postImagePath){
            throw new ApiError(404, "Post image path not found");
        }
        const postImage= await uploadOnCloudinary(postImagePath)

        const slug = req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "");

        const post = await Post.create({
            title,
            content,
            postImage: postImage.url,
            userId: req.user?._id,
            slug

        });
        if(!post){
            throw new ApiError(400,"post creation process failed");
        }
        return res.status(201)
        .json(
            new ApiResponse(201, post, "post created successfully")
        )
        

    
        
    } catch (error) {
        throw new ApiError(400,error.message)
        
    }


}

const deletePost = async(req, res) =>{
    try {
        const postId = req.params.postId;

        if(!postId){
            throw new ApiError(404, " post not found ")
        }

        const post = await Post.findById(postId);
        
        if(!post){
            throw new ApiError(404, " post not found");
        }
        if(post.userId.toString()!== req.user?._id.toString()){
            throw new ApiError(400, " You are not allowed to delete post")
        }

        await Post.findByIdAndDelete(postId);
        return res
        .status(200)
        .json(new ApiResponse(200, {}, "post delete successfully"));


    } catch (error) {
        throw new ApiError(400, error.message);
        
    }


}

const getAllpost = async(req, res) =>{
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === "asc" ? 1 : -1;


      const allPosts = await Post.find()
      .sort({updatedAt : sortDirection})
      .skip(startIndex)
      .limit(limit)

      if(!allPosts){
        throw new ApiError(404, "post not found");
      }

      const totalPost = await Post.countDocuments();

      return res.status(200)
      .json(
        new ApiResponse(
            200,
            {
                allPosts,
                totalPost
            },
            "Posts are fetched successfully"
        )
      )


        
    } catch (error) {
        
        throw new ApiError(400, error.message)
    }

}

const getPostById = async(req, res) =>{
    try {
        const postId = req.params.postId;

        if(!postId){
            throw new ApiError(400,"post not fount");
        }
        const post = await Post.findById(postId)

        if(!post){
            throw new ApiError(400,"post not found");
            
        }
        return res.status(200)
        .json(new ApiResponse(200,post , " reqiured of is fetched successfully"))
        
    } catch (error) {
        throw new ApiError(400, error.message);
        
    }

}

export { createPost, deletePost, getAllpost, getPostById}
    


