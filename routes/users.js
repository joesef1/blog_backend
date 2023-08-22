
const express = require('express');
const router = express.Router();

const {verifyTokenAndAuthorization,verifyTokenAndAdmin, verifyToken} = require("../middlewares/verifyToken");
const {
   updateUser, getAllUser,getUser,deleteUser,getUsersCount, profilePhotoUpload } = require('../controllers/userController');
const validateObjectId = require('../middlewares/validateObjectId');
const PhotoUpload = require('../middlewares/photoUpload');


router.put("/:id",validateObjectId,verifyTokenAndAuthorization, updateUser);
router.get("/", verifyTokenAndAdmin, getAllUser);
// router.route
// router.get("/:id",validateObjectId,verifyTokenAndAuthorization, getUser);
router.get("/count", getUsersCount);
router.delete("/:id",verifyTokenAndAuthorization,deleteUser);
router.post("/profile-photo-upload", verifyToken,PhotoUpload.single("image"),profilePhotoUpload);



module.exports = router;
