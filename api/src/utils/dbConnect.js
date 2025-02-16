import mongoos from 'mongoose'

const dbConnect = async()=>{
    try {
        const connection = await mongoos.connect(process.env.MONGODB_URI)
        if(!connection){
            console.log("Error in Connection URI");
        }else{
            console.log("Databse connected successfully");
        }
    } catch (error) {
        console.log("Error while connecting to Databse",error)
    }
}

export default dbConnect;