import jwt from "jsonwebtoken";

export const verifyToken= async(req, res, next)=>{

try{

    const authHeader=req.headers.authorization;

    if(!authHeader){
        return res.status(404).json({
            message:"token is required"
        });
    }

    const token=authHeader.split(" ")[1];

    const decode= jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    req.userId=decode.userId;
    req.role=decode.role;
    next();
}
catch(error){
    return res.status(404).json({
        message:"invalid token"
    });
}

};