import { Router } from "express";
import { deleteAccount, updateAccount} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const userRoute = Router();

//Update Account
userRoute.post('/update/:id',verifyUser,updateAccount)

//Delete Account
userRoute.delete('/delete/:id',verifyUser, deleteAccount)

export default userRoute