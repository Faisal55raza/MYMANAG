const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: false,
    },
    PostImage: {
      type: String,
      required: false,
    },
    AuthorName: {
      type: String,
      required: true,
    },
    UserId: {
      type: String,
      required: true,
    },
    Article: {
      type: String,
      required: true,
    },
    Category: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
