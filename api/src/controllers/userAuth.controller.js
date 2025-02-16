import bcrypt from 'bcryptjs'
import User from '../models/User.model.js'
import jwt from 'jsonwebtoken';

//register new User
export const register = async(req,res)=>{
    try {
        const {name,dateOfBirth,userName,password,email} = req.body;
        
        //check for all feilds
        if(!name || !dateOfBirth || !userName || !password || !email){
            return res.status(400).json({
                message : "All feilds are mandatory"
            })
        }

        //TODO-ZOD VALIDATION FOR ALL FEILDS

        //validate name 
        const regexForName = /^[a-zA-Z]+$/;
        if(!regexForName.test(name)){
            return res.status(400).json({
                message : "Name should contains only alphabets"
            })
        }

        //validate username
        const regexForUsername = /^[a-zA-Z].*/
        if(!regexForUsername.test(userName)){
            return res.status(400).json({
                message : "userName should start with alphabets"
            })
        }

        //validate email
        const regexForEmail =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!regexForEmail.test(email)){
            return res.status(400).json({
                message : "email should start with alphabets"
            })
        }

        //check if email already taken
        const emailPresent = await User.findOne({
            email
        })
        if(emailPresent){
            return res.status(400).json({
                message : "email in use , use any other email Id"
            })
        }

        //validate passwiord
        const regexForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
        if(!regexForPassword.test(password)){
            return res.status(400).json({
                message : "Please follow password creation guidlines"
            })
        }

        //encrypt password
        const encryptedPassword = bcrypt.hashSync(password,8);

        //save the new registered user
        const newUser = new User({
            name,
            dateOfBirth,
            userName,
            email,
            password : encryptedPassword
        })

        await newUser.save();

        // Prepare user data without password
        const userWithoutPassword = {
            ...newUser._doc,
            password: null,
        };

        //send success response
        res.status(200).json({
            message : "New user registered successfully",
            data : userWithoutPassword,
            success : true
        })


    } catch (error) {
        console.log("Error in registering new user",error);
        return res.status(404).json({
            message : "Something went wrong while registering new user",
            error 
        }) 
    }
}

//Login existing User
export const login = async(req,res)=>{
    try {
        const {userName,password} = req.body;

        //both feilds are mandatory
        if(!userName || !password){
            return res.status(400).json({
                message : "All feilds are mandatory"
            })
        }

        //check if user with userName is present
        const user = await User.findOne({
            userName
        })
        //if not , return invalid username response
        if(!user){
            return res.status(400).json({
                message : "Invalid Username"
            })
        }

        //validate password
        const regexForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
        if(!regexForPassword.test(password)){
            return res.status(400).json({
                message : "Invalid password"
            })
        }
        

        //decode password and match with user data
        const decryptedPassword = await bcrypt.compare(password,user.password)
        if(!decryptedPassword){
            return res.status(400).json({
                message : "Wrong password,please try again"
            })
        }

        //prepare user data without password
        const userWithoutPassword = {
            ...user._doc,
            password: null,
        };

        //create token for authentication
        const token = jwt.sign({id : userWithoutPassword._id},process.env.SECRET_KEY);

        return res
        .cookie('access_token', token, { httpOnly: true })
        .status(200).json({
            success : true,
            message : "Login successfull,Welcome",
            data : userWithoutPassword
        })

    } catch (error) {
        console.log("Error in Login",error);
        return res.status(404).json({
            message : "Something went wrong while loging in",
            error 
        }) 
    }
}

//Logout existing User
export const logout = async(req,res)=>{
    try {
        //authenticate User 
        if(req.params.id !== req.user.id){
            return res.status(400).json({
                success : false,
                message : "Unauthorised"
            })
        }
        //clear cookie
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        console.log("Error in Logout",error);
        return res.status(404).json({
            message : "Something went wrong while loging out",
            error 
        }) 
    }
}


