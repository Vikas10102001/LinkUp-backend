const Post = require("../model/Post");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../model/User");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "Not an image ! Please upload an image"), false);
  }
};
const upload = multer({ storage: multerStorage, filter: multerFilter });

exports.uploadPostPhoto = upload.single("photo");

exports.resizePostPhoto = (req, res, next) => {
  if (!req.file) next();
  else {
    req.file.filename = `user-post-${
      Date.now().toString(36) + Math.random().toString(36).substring(2)
    }.jpeg`;
    sharp(req.file.buffer)
      .resize(1000, 1000)
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
      .toFile(`public/img/posts/${req.file.filename}`);
    next();
  }
};

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await Post.create({
    ...req.body,
    photo: req.file.filename,
    user: req.user.id,
  });

  res.status(201).json({
    status: "success",
    post,
  });
});

exports.getPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    status: "success",
    posts,
  });
});

//liking a post
exports.likePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (post.Likes.includes(req.user.id) || post.Hearts.includes(req.user.id)) {
    return res.status(400).json({
      status: "failed",
      message: "You already like this post",
    });
  }
  let updatedPost;
  if (req.body.type === "Like") {
    updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $push: { Likes: req.user.id },
      },
      { new: true }
    );
  } else if (req.body.type === "Heart") {
    updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $push: { Hearts: req.user.id },
      },
      { new: true }
    );
  }

  res.status(201).json({
    status: "success",
    updatedPost,
  });
});

//disliking a post
exports.unlikePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (!post.Likes.includes(req.user.id)) {
    return res.status(400).json({
      status: "failed",
      message: "You do not like this post",
    });
  }
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.postId,
    { $pull: { Likes: req.user.id } },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    updatedPost,
  });
});

//get post for a user
exports.userFeedPosts = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const posts = await Post.find({
    user: { $in: [...user.followings, req.user.id] },
  }).populate({ 
    path: "user",
    select: "username profile",
  });
  res.status(200).json({
    status: "success",
    posts,
  });
});
