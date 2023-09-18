const About = require("../model/about");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAbout = catchAsync(async (req, res, next) => {
  const id = req.user.id;
  const about = await About.find({ user: id });
  if (!about) return next(new AppError(404, "User not found"));
  res.status(200).json({
    status: "success",
    data: about,
  });
});

//create about
exports.createAbout = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const about = await About.create({ user: userId, ...req.body });
  res.status(201).json({
    status: "success",
    data: about,
  });
});

//updating about
exports.updateAbout = catchAsync(async (req, res, next) => {
  const about = await About.findOne({ user: req.user.id });
  if (!about) return next(new AppError(404, "User not found"));

  const id = about._id;
  const updatedAbout = await About.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    status: "success",
    data: updatedAbout,
  });
});
