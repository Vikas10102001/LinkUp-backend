const multer = require("multer");
const sharp = require("sharp");
const User = require("../model/User");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "Not an image ! Please upload an image"), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single("profile");
exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) next();
  else {
    req.file.filename = `user_profile-${req.user.id}.jpeg`;
    sharp(req.file.buffer)
      .rotate()
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);
    next();
  }
};

//getUser
exports.getUser = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    users,
  });
});

//get user profile
exports.getSingleUser = catchAsync(async (req, res, next) => {
  const id = req.params.userId;
  let user = await User.findById(id).populate("about");
  res.status(200).json({
    status: "success",
    user,
  });
});

// //update me

// to do
exports.updateUser = catchAsync(async (req, res, next) => {
  const { email, uid, following, follower, ...updates } = req.body;
  console.log(req.file.filename);
  updates.profile = req.file.filename;
  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
  });
  if (!user) return next(new AppError(404, "User not found"));
  res.status(201).json({
    status: "success",
    data: user,
  });
});


//Search a user
exports.searchUser = catchAsync(async (req, res, next) => {
  const searchQuery = req.query.q;
  let users;
  if (searchQuery === "") users = [];
  else
    users = await User.find({
      username: new RegExp(`^${searchQuery}`, "i"),
    });
  users = users.map((el) => {
    return {
      _id: el._id,
      username: el.username,
      email: el.email,
      profile: el.profile,
      uid: el.uid,
    };
  });
  res.status(200).json({
    status: "success",
    users,
  });
});
