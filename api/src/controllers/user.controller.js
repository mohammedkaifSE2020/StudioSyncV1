import User from "../models/User.model.js";

export const updateAccount = async(req,res)=>{
    try {
        //destructure data from request
        const {name,dateOfBirth,userName,password,email} = req.body;
        //authenticate User 
        const id = req.params.id;
        if(id !== req.user.id){
            return res.status(400).json({
                success : false,
                message : "Unauthorised"
            })
        }
        //fetch user from database
        let updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set:
                {
                    name,
                    email,
                    userName,
                    dateOfBirth,                
                },
            },
            {new :true}
        )
        //send updated user in response
        res.status(200).json({
            success : true,
            message : "User updated successfully",
            data : updatedUser
        })
    } catch (error) {
        console.log("Error in Updating",error);
        return res.status(404).json({
            message : "Something went wrong while updating account",
            error 
        }) 
    }
}

export const deleteAccount = async(req,res)=>{
    try {
        //authenticate User 
        const id = req.params.id;
        if(id !== req.user.id){
            return res.status(400).json({
                success : false,
                message : "Unauthorised"
            })
        }
        //delete account from database
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(400).json({
                success : false,
                message : "Account NOT deleted"
            })
        }

        //send success response
        return res.status(200).json({
            success : true,
            message : "Account deleted successfully"
        })
    } catch (error) {
        console.log("Error in delete",error);
        return res.status(404).json({
            message : "Something went wrong while deleting account",
            error 
        }) 
    }
}

