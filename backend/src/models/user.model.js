import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userImage:{
        type: String,
        default: "https://cdn.wallpapersafari.com/51/76/3TFfqI.jpg"
    }
    
},{timestamps: true})
const User = mongoose.model('User',userSchema);

export default User;