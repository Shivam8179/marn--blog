import mongoose from 'mongoose';

const db_Name = "mern-blog"

console.log("MONGODB", process.env.MONGODB_URL);


const connectdb = async() => {
 try{
   const connect = await mongoose.connect(`${process.env.MONGODB_URL}/${db_Name}`)
   console.log("mangodb connected successfully")
 }catch (error) {
    console.log("mangodb error",error);
 }
}
export default connectdb;