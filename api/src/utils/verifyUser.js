import jwt from 'jsonwebtoken'

export const verifyUser = (req,res,next)=>{
    const token = req.cookies?.access_token;
    if(!token){
        return res.status(400).json({
            success : false,
            message : "Unauthorised"
        })
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,id)=>{
        if(err){
            return res.status(400).json({
                success : false,
                message : "Unauthorised"
            })
        }
        req.user = id;
        next();
    });
};