const User = require('../model/user');
const jwt = require('jsonwebtoken');

//Json Web Token Generator
const generateJwtToken = (_id, email)=>{
    return jwt.sign({_id, email}, process.env.JWT_KEY,{expiresIn: '1h'});
}

//Sign Up
exports.Signup = (req, res)=>{
    User.findOne({email: req.body.email},(userExist)=>{
        if(userExist){
            return res.status(400).json("This User Already Registered.");
        }
        else{
            const {firstName, lastName, email, password} = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password
            });

            _user.save((err,user)=>{
                if (err) {
                    return res.status(401).json("Something Went Wrong.");
                }
                if (user) {
                    return res.status(201).json("User Registered Successfully.");
                }
            });
        }
    })
}


//Sign In
exports.Signin = (req, res)=>{
    User.findOne({ email: req.body.email }).exec(
        (error,user)=>{
            if(error)
            return res.status(404).json(error);
            if (user)
            {
                if(user.password == req.body.password){
                    const token = generateJwtToken(user._id, user.email);
                    return res.status(200).json({token: token});
                }
                else { return res.status(401).json('Incorrect Password.'); }
            }
            else { return res.status(404).json('User Not Found'); }
        }
    );
}
