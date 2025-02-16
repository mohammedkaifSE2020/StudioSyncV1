import express, { json, urlencoded } from "express";
import dotenv from 'dotenv'
import dbConnect from './utils/dbConnect.js'
import authRoute from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import userRoute from "./routes/user.route.js";
import workspaceRouter from "./routes/workspace.route.js";

dotenv.config();

const app = express();

//initialise middlewares
app.use(json())
app.use(urlencoded({ extended: true }));
app.use(cookieParser())

//Connect to databse
dbConnect();

//routes
app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/workspace',workspaceRouter);

//start server
app.listen(process.env.PORT,()=>{
    console.log("Server is running")
})