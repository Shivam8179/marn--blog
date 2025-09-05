import validator from "validator"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js"
import User from "../models/user.model.js"
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})



const register = async (req, res) => {
    //logic
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            throw new ApiError(400, "All fileds are required")

        }
        const isExistUser = await User.findOne({ $or: [{ userName: userName.trim() }, { email: email.trim() }] });
        if (isExistUser) {
            throw new ApiError(400, "User already exists")
        }
        if (!validator.isEmail(email)) {
            throw new ApiError(400, "email invalid ")
        }
        if (password.length < 6) {
            throw new ApiError(400, "password must be more than six letter ,")
        }

        const hashedPassword = bcrypt.hashSync(password, 10)


        const userImagePath = req.file?.path;
        console.log("before", userImagePath);


        if (!userImagePath) {
            throw new ApiError(400, "userImage file not found ")
        }
        console.log("user path", userImagePath);

        const userImage = await uploadOnCloudinary(userImagePath)

        if (!userImage) {
            throw new ApiError(400, "user image not found on cloudinary")
        }

        const user = await User.create({
            userName: userName.trim(),
            email: email.trim(),
            userImage: userImage.url,
            password: hashedPassword,
        })
        const createdUser = await User.findById(user._id).select("-password")
        if (!createdUser) {
            throw new ApiError(400, "user not created ")
        }

        const saveduser = await createdUser.save();
        return res.status(201).json(new ApiResponse(
            201, saveduser, "user created successfully"
        ))
    } catch (error) {
        throw new ApiError("something went wrong ", error)
    }
}


const signIn = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        console.log(req.body);
        
        if (!userName || !email || !password) {
            throw new ApiError(400, "all fields are required")
        }

        if (!validator.isEmail(email)) {
            throw new ApiError(400, "email invalid ")
        }

        const isExistUser = await User.findOne({ $or: [{ userName: userName.trim() }, { email: email.trim() }] })
        
        if (!isExistUser) {
            throw new ApiError(400, "user not found")
        }

        const comparePass = bcrypt.compareSync(password, isExistUser.password);
        console.log("com",comparePass);
        

        if (!comparePass) {
            throw new ApiError(400, "Invalid password")
        }
        console.log("process.env.ACCESS_TOKEN_SECRET",process.env.ACCESS_TOKEN_SECRET);
        
        const token = jwt.sign({ id: isExistUser._id }, process.env.ACCESS_TOKEN_SECRET);

        console.log("token", token);
        

        if (!token) {
            throw new ApiError(400, "token not found")
        }

        const loggedInUser = await User.findById(isExistUser._id).select("-password")
        console.log(loggedInUser);
        

        const options = {
            httpOnly: true,
            secure: false,
        }
        return res.status(200)
            .cookie("accessToken", token, options)
            .json(new ApiResponse(
                200,
                {
                    loggedInUser,
                    token
                },
                "user logged in successfully"
            ))


    } catch (error) {
        throw new ApiResponse(400, error)
    }






}

const signOut = async (req, res) => {s
    // logic
    const options = {
            httpOnly: true,
            secure: false,
        };
    return res.status(200)
    .clearCookie("accessToken",options)
    .json(new ApiResponse(200, {}, " User logout successfull"))
}
export { register, signIn, signOut }