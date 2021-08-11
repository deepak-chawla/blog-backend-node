const jwt = require('jsonwebtoken');

exports.requireSignIn = (req, res, next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token,process.env.JWT_KEY);
        req.user = user;
    }else{
        res.status(400).json({messege: "Authorization Required."});
    }
    next();
}