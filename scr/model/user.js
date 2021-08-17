const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    }
},
{timestamps: true}
);

userSchema.virtual("fullName").get(function (){
    return `${this.firstName} ${this.lastName}`;
});


module.exports = mongoose.model('User',userSchema);