const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    caption: {
      type: String,
    },
    photo: {
      type: String,
      required: [true, "A post must have a photo"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    Likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    Hearts: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    tags: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  {
    timeStamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true },
  }
);

postSchema.virtual('comments',{
  ref:'Comment',
  foreignField:'post',
  localField:'_id'
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
