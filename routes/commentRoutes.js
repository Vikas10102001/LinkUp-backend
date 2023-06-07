const express = require("express");
const authController = require("../controller/authController");
const commentController = require("../controller/commentController");
const router = express.Router();

router.get("/", commentController.getComments);
router.use(authController.protect);
router
  .route("/")
  .post(
    commentController.createComment
  );
router.route("/like/:commentId").patch(commentController.likeComment);
router.route("/unlike/:commentId").patch(commentController.unlikeComment);
module.exports = router;