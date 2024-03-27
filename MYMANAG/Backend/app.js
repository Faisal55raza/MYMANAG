const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const UserAuth = require("./Routes/Auth");
const UserUpdate = require("./Routes/Users");
const Post = require("./Routes/Posts");
const Category = require("./Routes/Categories");
const Cors = require("cors");
app.use(Cors());
const multer = require("multer");
const path = require("path");
app.use("/Images", express.static(path.join(__dirname, "/Images")));
const mongoose = require("mongoose");
/*************Mongo Connection**************/
mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("DataBase is Connected Successfully");
  }
);

/*************** Image Uploader****************/

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.FileName);
  },
});
const Upload = multer({ storage: Storage });
app.post("/Upload", Upload.single("file"), (req, res) => {
  res.status(200).json("File has been Uploaded");
});
/***************Browsing Request***************/
app.use("/Auth", UserAuth);
app.use("/Update", UserUpdate);
app.use("/Post", Post);
app.use("/Cat", Category);
/************Listening**************/
const Port = process.env.PORT || 80;
app.listen(Port, () => {
  console.log("App is Running at PORT", Port);
});
