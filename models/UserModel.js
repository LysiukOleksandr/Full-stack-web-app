const crypto = require('crypto')

const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: {
        unique: true,
        required: true,
        lowercase: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    isVerified: {
        default: false,
        type: Boolean
    },
    passwordResetToken: {
        type: String
    },
    name: {
        default: '',
        type: String
    },
    surname: {
        default: '',
        type: String
    },
    birthday:{
        default: '',
         type: String
    },
    userPhoto:{
        default: '',
        required: String
    },
    userResume:{
        default: '',
        required: String
    }
})

module.exports = model('User', userSchema)