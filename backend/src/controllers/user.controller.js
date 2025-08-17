import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/apiResponse.js";



const updateDetail = async (req, res) => {
    try {
        const {userName , email} = req.body;
        

        if(!userName || !email){
             throw new ApiError(400, " All field are required");
        }

        const updateUser = await User.findByIdAndUpdate(
            req.user?._id,
            {
             $set: {
                userName : userName.trim(),
                email : email.trim()
             }
            }, 
            {new : true}
        )

        
        if(!updateUser){
            
            throw new ApiError(400,"user updation process failed")
        }

        const user = await updateUser.save();
        console.log( user);
        
        return res.status(200)
        .json(new ApiResponse(200,user,"user updated successfully"))

        
    } catch (error) {
        throw new ApiError(400, error.message);
        
    }
    

}


const udateUserImage = async (req, res) => {

    //logic

}



const changePassword = async (req, res) => {

    try {
        
        const { oldPass, newPass } = req.body;

        if(!oldPass || !newPass){
            throw new ApiError(400,"All field are required")
        }

       const user = await  User.findById(req.user?.id)
       console.log("user from", user);
       
       if(!user){
        throw new ApiError(400,"Invalid user")
       }

       const  comparepass =  bcrypt.compareSync(oldPass, user.password)

       if(!comparepass){
        throw new ApiError(400,"password not match")
       }

       const hashedNewPass = bcrypt.hashSync(newPass, 10);

       user.password = hashedNewPass;

       await user.save();

       return res.status(200)
       .json(new ApiResponse(200, {}, "password changed successfully"))

        
    } catch (error) {
        throw new ApiError(400, error.message)
        
    }

}



const deleteUser = async (req, res) => {

    //logic
    try {
          console.log(req.user);
          
       await User.findByIdAndDelete(req.user?._id);

       const Option = {
        httOnly : true,
        secure: false
       }

       return res.status(200)
       .clearCookie("accessToken",Option)
       .json(new ApiResponse(200,{},"User Deleted successfull"))
        
    } catch (error) {
        
        throw new ApiError (400, error.message)
    }

}


export{ updateDetail, udateUserImage, changePassword, deleteUser}





