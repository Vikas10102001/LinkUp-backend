const Mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = Mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "A user must give their username"],
      max: [30, "Too long username ! Use less than 30 character"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please give your email address"],
      validator: [validator.isEmail, "Enter a valid email address"],
    },
    profile: {
      type: String,
      default: " ",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Please give your password"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password not matched",
      },
    },
    followers: [
      {
        type: Mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: Mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    private: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    about: [
      {
        type: Mongoose.Schema.ObjectId,
        ref: "About",
      },
    ],
  },
  {
    timeStamps: true,
  }
);

userSchema.methods.correctPassword = async function (
  userPassword,
  enteredPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = Mongoose.model("User", userSchema);

module.exports = User;
