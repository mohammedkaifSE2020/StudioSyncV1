import { Router } from "express";
import { login, logout, register } from "../controllers/userAuth.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const authRoute = Router();

//User Register
authRoute.post('/register', register)

//User Login
authRoute.post('/login', login)

//User Logout
authRoute.get('/logout/:id',verifyUser, logout)

export default authRoute;