import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema({
    title: {
        type: String,
       
        required: true,
    },
    Content:{
        type: String,
        required: true,
        
    },
    UserId: {
        type: mongoose.Types.ObjectId,
        ref:"User",

        required: true,
    },
    postImage:{
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/219/219969.png"
    },
    slug:{
        types: String,
        required: true,
        unique: true,
    }
    
},{timestamps: true})
const Post = mongoose.model('Post',postSchema);

export default Post;