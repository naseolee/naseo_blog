// models/User.js

let mongoose = require('mongoose');

// schema
let blogUserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required!'],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Should be a vaild email address!'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required!'],
        select: false
    },
    name: {
        type: String,
        required: [true, 'name is required'],
        match: [/^.{4,12}$/, 'Should be 4-12 characters'],
        trim: true

    },
    nickname: {
        type: String,
        required: [true, 'nickname is required'],
        match: [/^.{4,12}$/, 'Should be 4-12 characters'],
    }
    //authority:{type:Number}
}, {
    toObject: { virtuals: true }
});

// virtuals
userSchema.virtual('passwordConfirmation')
    .get(() => { return this._passwordConfirmation })
    .set((value) => { this._passwordConfirmation = value; });

userSchema.virtual('originalPassword')
    .get(() => { return this._originalPassword })
    .set((value) => { this._originalPassword = value; });

userSchema.virtual('currentPassword')
    .get(() => { return this._currentPassword })
    .set((value) => { this._currentPassword = value; });

userSchema.virtual('newPassword')
    .get(() => { return this._newPassword })
    .set((value) => { this._newPassword = value; });



//model & export
let User = mongoose.model('bloguser', blogUserSchema);
module.exports = User;