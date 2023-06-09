const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    otp:{
        type:Number,
        default: null,
    },
    refreshToken:{
        type: String,
        default: '',
        trim: true,
    }
  }, {
    timestamps: true
});
  const User = mongoose.model('users', UserSchema);
  module.exports = User;