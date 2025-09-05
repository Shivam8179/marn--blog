import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Comment from "../models/comment.model.js"


const createComment = async (req, res) => {
    try {
        const { content, postID } = req.body;

        if (!content || !postID) {
            return (new ApiError(400, "Content and PostID are required"));
        }

        const comment = await Comment.create({
            content,
            userID: req.user._id,
            postID,
        });

        if (!comment) {
            return (new ApiError(400, "Comment creation failed"));
        }

        return res.status(201).json(
            new ApiResponse(201, comment, "Comment added successfully")
        );
    } catch (error) {
        (new ApiError(400, error.message));
    }
};


const getComment = async (req, res) => {
    try {

        const postId = req.params.postId;
        if (!postId) {
            throw new ApiError(404, "postId not found");
        }

        const comment =  await comment.findById({ postId })

        if (!comment || comment.length === 0) {
            return (new ApiError(404, "No comment found for this post"));
        }

        return res
            .status(200)
            .json(new ApiResponse(200, comment, "Comments fetched successfully"));

    } catch (error) {
        (new ApiError(400, error.message));
    }
}


const deleteComment = async (req, res) => {

    try {
        const commentId = req.params.commentId;
        if (!commentId) {
            throw new ApiError(404, "commentId not found");
        }

        const comment = await Post.findById(commentId);

        if (!comment) {
            throw new ApiError(404, "comment not found");
        }

        if (comment.userID.toString() !== req.user?._id.toString()) {
            throw new ApiError(400, "you are not allowed to delete comment")
        }

        await comment.findByIdAndDelete(commentId)

        return res.status(200)
            .status(200)
            .json(new ApiResponse(200, {}, "comment deleted successfully"));

    } catch (error) {
        throw new ApiError(400, error.message)

    }

}

export { deleteComment, getComment, createComment }