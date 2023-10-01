const mongoose = require("mongoose");
const requestSchema = mongoose.Schema(
  {
    first: {
      type: mongoose.Schema.ObjectId,
      required: [true, "A request must have a user1"],
    },
    relation: {
      type: String,
      enum: ["FOLLOW,REQUEST,BLOCK"],
    },
    second: {
      type: mongoose.Schema.ObjectId,
      required: [true, "A request must have a user2"],
    },
  },
  {
    timeStamps: true,
  }
);

const Comment = mongoose.model("Comment", requestSchema);

module.exports = Comment;
