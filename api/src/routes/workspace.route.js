import { Router } from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createWorkspace, deleteWorkspace, getWorkspaces, updateWorkspace } from "../controllers/workspace.controller.js";

const workspaceRouter = Router();

//create workspace
workspaceRouter.post('/create/:id',verifyUser,createWorkspace)

//retreive all workspaces
workspaceRouter.get('/get/:id',verifyUser,getWorkspaces)

//update workspaces
workspaceRouter.put('/update/:id',verifyUser,updateWorkspace)

//delete workspaces
workspaceRouter.delete('/delete/:id',verifyUser,deleteWorkspace)

export default workspaceRouter;

