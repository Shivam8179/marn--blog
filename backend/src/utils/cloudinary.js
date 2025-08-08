import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME=dcjqvhcdy, 
  api_key: process.env.CLOUDINARY_API_KEY=131759512685431, 
  api_secret: process.env.CLOUDINARY_API_SECRET=CmzRZdbbITe62LLPtL_sFpdeTro
});
const uploadOnCloudinary = async(localFilePath) => {
    try{
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{
    resource_type: "auto", 
        });
        console.log("file uploaded successfull on cloudinary",response.url);
        if (fs.existsSync(localFilePath))
            fs.rmSync(localFilePath)

        


    } catch (error) {}
    console.log("error occur while uploading on cloudinary",error);
    if (fs.existsSync(localFilePath))
            fs.rmSync(localFilePath)

};
export {uploadOnCloudinary};