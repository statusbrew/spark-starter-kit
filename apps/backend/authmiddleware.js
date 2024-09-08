const jwt= require('jsonwebtoken')
const secret=require('./secret')

const authmiddleware=(req,res,next)=>{

    const authorization=req.headers.authorization;
    
    if (!authorization || !authorization.startsWith('Bearer')){
        return res.status(403).json({msg:'no auth'})
    }
    const token=authorization.split(' ')[1];
    try {
        const decoded=jwt.verify(token,secret);


        if (typeof decoded === 'string') {
            req.userEmail = decoded; 
        } else if (typeof decoded === 'object' && 'email' in decoded) {
            req.userEmail = decoded.email;
        } else {
            throw new Error('Invalid token');
        }
        next()
    }catch(err){
        res.status(403).json({msg:'bad auth'})
    }
}
module.exports=authmiddleware