const express = require("express");
const authController = require("../controller/authController");
const postController = require("../controller/postController");
const router = express.Router();

router.get("/", postController.getPosts);
router.use(authController.protect);
router
  .route("/")
  .post(
    postController.uploadPostPhoto,
    postController.resizePostPhoto,
    postController.createPost
  );
router.route("/feed").get(postController.userFeedPosts)
router.route("/like/:postId").patch(postController.likePost);
router.route("/dislike/:postId").patch(postController.unlikePost);
module.exports = router;
