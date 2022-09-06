const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
 name: {
    type: String,
    required : [true, 'Please add a Username'],
    unique: true,
    match: [
        'Please add a valid email'
    ]
 },
 role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user'
 },
 password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
 },
 resetPasswordToken: String,
 resetPasswordExpire: Date,
 createdAt: {
    type: Date,
    default: Date.now
 }
});