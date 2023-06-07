const Comment = require("../model/Comment");
const Post = require("../model/Post");
const catchAsync = require("../utils/catchAsync");

exports.createComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.body.post);
  if (!post) return next(new Error("post deleted by the user"));

  const comment = await Comment.create({ ...req.body, user: req.user.id });
  res.status(201).json({
    status: "success",
    comment,
  });
});

exports.getComments = catchAsync(async (req, res, next) => {
  const posts = await Comment.find();
  res.status(200).json({
    status: "success",
    posts,
  });
});

//liking a comment
exports.likeComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return next(new Error("No comment with that id"));
  }
  if (comment.Likes.includes(req.user.id)) {
    return res.status(400).json({
      status: "failed",
      message: "You already like this comment",
    });
  }
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      $push: { Likes: req.user.id },
    },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    updatedComment,
  });
});

//unliking a comment
exports.unlikeComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return next(new Error("No comment with id"));
  }
  if (!comment.Likes.includes(req.user.id)) {
    return res.status(400).json({
      status: "failed",
      message: "You do not like this comment",
    });
  }
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.commentId,
    { $pull: { Likes: req.user.id } },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    updatedComment,
  });
});

//deleting a comment
exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.comment);
  if (!comment) return next(new Error("no comment with that id"));

  const post = await Post.findById(comment.post);
  if (!post) return next(new Error("post deleted by the user"));

  if (!(comment.userId === req.user.id) && !(post.user === req.user.id)) {
    return res.status(403).json({
      status: "failed",
      message: "You cannot delete this comment",
    });
  }

  await Comment.findByIdAndDelete(req.params.comment);
  res.status(200).json({
    status: "success",
    message: "successfully deleted",
  });
});
