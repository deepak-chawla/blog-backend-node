const Admin = require('../model/admin');

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
        if (admin){
            return res.status(400).json({admin});
        }
    }
    );
}