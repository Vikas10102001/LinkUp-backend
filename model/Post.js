const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    caption: {
      type: String,
    },
    postData: {
      type: Buffer,
      required: [true, "A post must have a photo or a video"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A post must belong to a user"],
    },
    tags: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  {
    timeStamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
