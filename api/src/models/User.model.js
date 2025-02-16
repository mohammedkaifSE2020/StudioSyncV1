import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    dateOfBirth : {
        type : Date ,
        required : true,
    },
    userName : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    organisation : {
        type : String,
    },
    role : {
        type : String,
    },
    phone : {
        type : Number 
    },
    photo : {
        type : String,
    }
})

const User = mongoose.model("User",userSchema)

export default User;