import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})




import express from "express";
import connection from './db/databaseConnection.js';
import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.routes.js';


const app = express();
// //middleware
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(express.json())


connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server running on port", process.env.PORT);

    })
}).catch((error) => {
    console.log("server connection failed", error);

 });
app.use("/api/auth",authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter );
console.log("hello");


        
        