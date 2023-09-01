const mongoose = require("mongoose");
const requestSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: [true, "A request must have a sender"],
    },
    reciever: {
      type: mongoose.Schema.ObjectId,
      required: [true, "A request must have a reciever"],
    },
  },
  {
    timeStamps: true,
  }
);

const Comment = mongoose.model("Comment", requestSchema);

module.exports = Comment;
