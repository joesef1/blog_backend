
const express = require('express');
const router = express.Router();
const {registerUserCtrl,loginUser} = require('../controllers/authController');


//login | register
router.post("/register",registerUserCtrl);
router.post("/login", loginUser);



module.exports = router;













