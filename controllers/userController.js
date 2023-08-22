const {validateRegisterUser, validateLoginUser, validateUpdateUser, User} = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require("path");
const { cloudinaryUploadImage,cloudinaryRemoveImage } = require("../utils/cloudinary");
const { log } = require("console");


/*
* @desc update user
* @route /api/users/:id
* @method put
* @access private
*/

 const updateUser = asyncHandler(async (req,res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password ,salt );
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id,{
    $set:{
      email: req.body.email,
      password: req.body.password,
      userName: req.body.userName,
    }
   },{new:true}).select("-password")

  res.status(200).json(updatedUser);

}
)



/** 
* @desc get all users
* @route /api/users
* @method get
* @access private (onlyadmin)
*/
 const getAllUser = asyncHandler(async (req,res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);

}
)


/** 
* @desc get user
* @route /api/users/:id
* @method get
* @access private (onlyadmin and user)
*/
const getUser = asyncHandler(async (req,res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
      res.status(200).json(user);
  }else{
    res.status(404).json({message:"user not found"});
  }

}
)



/** 
* @desc delete user
* @route /api/users/:id
* @method delete
* @access private (onlyadmin and user)
*/

const deleteUser = asyncHandler(async (req,res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    await User.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"user deleted"});
  }else{
    res.status(404).json({message:"user not found"});
  }
}
)





/** 
* @desc profile photo upload
* @route /api/users/profile-photo-upload
* @method post
* @access private (only logger user)
*/
const profilePhotoUpload = asyncHandler(async (req,res) => {

  if (!req.file) {
    return res.status(400).json({message :"no file provided"})
  }


  // 2- get the path of img
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
const result =await cloudinaryUploadImage(imagePath)
console.log(result);
  // 3- upload to cloudinary

  res.status(200).json({message :"your photo uploaded successfully"});
}
)























/** 
* @desc get users count
* @route /api/users/count
* @method get
* @access private (onlyadmin)
*/
const getUsersCount = asyncHandler(async (req,res) => {
  const count = await User.count();
  res.status(200).json(count);

}
)





module.exports = {
  updateUser,
  getAllUser,
  getUser,
  deleteUser,
  profilePhotoUpload,
  getUsersCount

} 