const mongoose = require("mongoose");
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  isAdmin: {
    type: Boolean, // Corrected type definition
    default: false, // Note: Set the default value as a boolean
  },
  profilePhoto:{
    type: Object,
    default:{
      url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      publicId: null,
    },
    bio: {
      type: String, 
  },
  isAccuntverified: {
    type: Boolean, 
    default: false,
},
}}, {
  timestamps: true
});

// ... rest of the code remains unchanged ...



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
