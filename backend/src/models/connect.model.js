import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema({

    Content:{
        type: String,
        required: true,
        
    },
    UserId: {
        type: mongoose.Types.ObjectId,
        ref:"User",

        required: true,
    },
    postId:{
        type: mongoose.Types.ObjectId,
        ref:"Post",

        required: true,
    },
    likes:{
        types:[mongoose.Types.ObjectId],
        dafualt:[]
    }
    
},{timestamps: true})
const Comment = mongoose.model('Comment',commentSchema);

export default Comment;