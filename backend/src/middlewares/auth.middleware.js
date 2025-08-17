import { ApiError } from "../utils/ApiError.js"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config({
    path: './.env'
})


import User from "../models/user.model.js"
const verifyJWT = async (req, res, next) => {
    try { 
        
        
        const tokenFromClient = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
        
        if (!tokenFromClient) {
            throw new ApiError(400, "token not found")
        }

        const decodedToken = jwt.verify(tokenFromClient, process.env.ACCESS_TOKEN_SECRET)
        
        if (!decodedToken) {
            throw new ApiError(400, "Invalid access token")
        }
        const user =  await User.findById(decodedToken?.id).select(" -password")
    
        if (!user) {
            throw new ApiError(400, "invalid user")
        }

        req.user = user;
        
        next()


    } catch (error) {
        throw new ApiError(400, error.message)
    }
}

export default verifyJWT