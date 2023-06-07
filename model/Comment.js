const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Please give your comment "],
    },

    Likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    pinned: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref:'Post',
      required: [true, "comment should belong to a post "],
    },
    replies: [
      {
        type: String,
        required: [true, "Please give your comment "],
      },
    ],
  },
  {
    timeStamps: true,
    
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
