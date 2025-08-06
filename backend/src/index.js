// console.log("hello world");
// console.log("Hii!");

import dotenv from 'dotenv';
dotenv.config({
    path:'./.env'
})
import connectdb from './db/databaseConnection.js';
connectdb();