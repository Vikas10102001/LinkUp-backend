const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const aboutController = require("../controller/aboutController");

//signUp
router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
//Getting User
router.route("/").get(userController.getUser);
//Updating User
//Deleting User
//searching user
router.route("/search").get(userController.searchUser);
// router.route('/:id').get(getUserHandler)
router
  .route("/:userId/follow")
  .patch(authController.protect, userController.followUser);
router
  .route("/:userId/unFollow")
  .patch(authController.protect, userController.unfollowUser);
module.exports = router;

//about routes
router.use(authController.protect);
router
  .route("/about")
  .get(aboutController.getAbout)
  .post(aboutController.createAbout)
  .patch(aboutController.updateAbout);
