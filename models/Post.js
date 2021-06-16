// models/Post.js

let mongoose = require('mongoose');

// schema
let blogpostSchema = mongoose.Schema({
    title :{type:String, required:[true,'Ttile is required!']},
    body:{type:String, required:[true, 'Body is required!']},
    category:{type:String, required:[true, 'Category is required']},
    //author:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    createdAt:{type:Date, default:Date.now()},
    updatedAt:{type:Date},
});

//model & export
let Post = mongoose.model('blogpost', blogpostSchema);
module.exports = Post;