import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})


import express from "express";
import connection from './db/databaseconnection.js';

const app = express();

app.get('/', (req, res)=>{
    return res.json({"username": "shivam"})
})

connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server running on port", process.env.PORT);

    })
}).catch((error) => {
    console.log("server connection failed", error);

});