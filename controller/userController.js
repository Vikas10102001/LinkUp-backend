const User = require("../model/User");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

//getUser
exports.getUser = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    users,
  });
});

//follow User
exports.followUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const followUser = await User.findById(req.params.userId);
  if (user.followings.includes(req.params.userId)) {
    return next(new AppError(400, "You already follow him"));
  }

  if (followUser.private === true) {
    await User.findByIdAndUpdate(req.params.userId, {
      $push: { requests: req.user.id },
    });
    return res.status(201).json({ status: "success", message: "Request Sent" });
  }
  await User.findByIdAndUpdate(req.user.id, {
    followings: [...user.followings, req.params.userId],
  });
  res.status(201).json({
    status: "success",
    message: "user followed",
  });
});

//unfollow a user
exports.unfollowUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user.followings.includes(req.params.userId)) {
    return next(new AppError(400, "You do not follow this user"));
  }
  user.followings.splice(user.followings.indexOf(req.params.userId), 1);
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "user unfollowed",
  });
});
