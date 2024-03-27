const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      unique: true,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    ProfileImage: {
      type: String,
      required: false,
      default: "default.png",
    },
    About: {
      type: String,
      required: false,
      default: "Hey I am New User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
