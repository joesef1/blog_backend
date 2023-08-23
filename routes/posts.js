const router = require("express").Router();
const {
  createPostCtrl,
  // getAllPostsCtrl,
  // getSinglePostCtrl,
  // getPostCountCtrl,
  // deletePostCtrl,
  // updatePostCtrl,
  // updatePostImageCtrl,
  // toggleLikeCtrl,
} = require("../controllers/postController");
const photoUpload = require("../middlewares/photoUpload");
const { verifyToken } = require("../middlewares/verifyToken");
// const validateObjectId = require("../middlewares/validateObjectId");

// /api/posts
router
  .route("/")
  .post(verifyToken, photoUpload.single("image"), createPostCtrl)

module.exports = router;