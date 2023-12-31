const mongoose = require("mongoose");
const Joi = require('joi');

// User Schema
const UserSchema = new mongoose.Schema({
  userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
            publicId: null,
        }
    },
    bio: {
        type: String,
    },
    isAdmin: {
        type:Boolean,
        default: false,
    },
    isAccountVerified: {
        type:Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


const User = mongoose.model("User", UserSchema);

//validate register functions
function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    userName: Joi.string().trim().min(2).max(200).required(),
    password: Joi.string().trim().min(6).required(),
})

  return schema.validate(obj) ;
}



//validate login functions
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(6).required()
})

  return schema.validate(obj) ;
}



//validate update functions
function validateUpdateUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).email(),
    userName: Joi.string().trim().min(2).max(200),
    password: Joi.string().trim().min(6),
})

  return schema.validate(obj) ;
}





module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
}
