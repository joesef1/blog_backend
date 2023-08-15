const asyncHandler = require("express-async-handler");

/*
* @desc update user
* @route /password/forgot-password
* @method get
* @access public
*/

module.exports.getForgotPasswordView = asyncHandler( (req,res) => {
  res.render("forgot-password");
  });

  

  
/*
* @desc send Forgot Password Link
* @route /password/forgot-password
* @method post
* @access public
*/

module.exports.sendForgotPasswordLink = asyncHandler( async (req,res) => {
  console.log(req.body.email);
  });
  