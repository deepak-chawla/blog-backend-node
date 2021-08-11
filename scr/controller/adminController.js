const Admin = require('../model/admin');
const jwt = require('jsonwebtoken');


const generateJwtToken = (_id, email)=>{
    return jwt.sign({_id, email}, process.env.JWT_KEY,{expiresIn: '1h'});
}

exports.Signup = (req, res)=>{
    const {firstName, lastName, email, password} = req.body;
    const _admin = new Admin({
        firstName,
        lastName,
        email,
        password
    });

    _admin.save((error,admin)=>{
        if(error){
            return res.status(400).json({messege: "Something went wrong"});
        }
        if (admin) {
            const token = generateJwtToken(admin._id, admin.email);
            return res.status(201).json({token});
          }
    }
    );
}

exports.Signin = (req, res)=>{
    Admin.findOne({ email: req.body.email }).exec(
        (error,admin)=>{
            if(error)
            return res.status(404).json({error});
            if (admin)
            {
                 if(admin.password == req.body.password){
                     const token = generateJwtToken(admin._id, admin.email);
                     return res.status(200).json({token});
                 }
                 else { return res.status(200).json({messege: 'incorrect password'}); }
            }
            else { return res.status(200).json({messege: 'user not found'}); }
        }
    );
}