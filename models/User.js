const { Schema, model } = require('mongoose');

const UserSchema = new Schema ({
    username: {
        type: String, 
        trim: true,
        unique: true,
        required:  "You're gonna need a username",
        index: true
    },

    email: {
        type: String,
        unique: true,
        required: [true, "You can't leave this blank"],
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i, "Please enter a valid email address"] 
    },

    //include thoughts

    //include friend count self-reference user model


});

const User = model('User', UserSchema);

module.exports = User;