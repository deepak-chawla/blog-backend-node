const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    text:{
        type: String,
        trim: true,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    thumbnail:{
        type: String
    },
    image:{
        type: String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

postSchema.virtual('url').get(function(){
    return '/post/' + this._id
});

module.exports = mongoose.model('post', postSchema);