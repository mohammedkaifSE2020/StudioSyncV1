import mongoose from "mongoose";
import User from "./User.model.js";

const workspaceSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlength: 3, // Minimum length of 3 characters
        maxlength: 100 // Maximum length of 100 characters
    },
    description : {
        type : String,
        required : true,
        maxlength: 500 // Optional: Limit description length
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }, 
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", required: true 
    }, 
    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }]
})

const workspace = mongoose.model("Workspace", workspaceSchema);

export default workspace;