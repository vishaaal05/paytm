// import { connect, Schema, model } from "mongoose";
const { connect, Schema, model } = require("mongoose");
require('dotenv').config();

connect(process.env.MONGODB_URL);

const userSchema = new Schema({
    // username: String,
    // password: String,
    // firstname: String,
    // lastname: String

    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minLength: 6
    },
    firstName: {
        type: String,
        required: [true, 'Please add first name'],
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: [true,'Please add last name'],
        trim: true,
        maxLength: 50
    }
});


const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // Reference to User model
        ref: 'User', // if a user only with some id can put money here
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

// mongoose.model('Account', accountSchema):
//  This creates a model named Account using the accountSchema. Mongoose will look for a collection named accounts in the database.

const Account = model('Account', accountSchema);  
const User = model("User", userSchema);

module.exports = {
	User,
    Account
};