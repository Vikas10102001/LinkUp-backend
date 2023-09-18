const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "about should be of a user"],
      immutable: true,
    },
    description: {
      type: String,
    },
    birthday: Date,
    relationship: {
      type: String,
      enum: ["SINGLE", "MARRIED"],
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

const About = mongoose.model("About", aboutSchema);

module.exports = About;
