const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "about should be of a user"],
    },
    birthday: Date,
    relationship: {
      type: String,
      enum: ["Single", "Married"],
    },
    address: {
      type: String,
    },
    profession: {
      type: String,
    },
    hobbies: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);

const Comment = mongoose.model("Comment", requestSchema);

module.exports = Comment;
