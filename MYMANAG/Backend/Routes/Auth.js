const UserModel = require("../Model/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/Register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(req.body.Password, salt);
    const newUser = await UserModel({
      UserName: req.body.UserName,
      Email: req.body.Email,
      Password: HashedPassword,
      ProfileImage: req.body.ProfileImage,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/SignIn", async (req, res) => {
  try {
    const User = await UserModel.findOne({ Email: req.body.Email });
    !User && res.status(400).send("Wrong Credentials");
    const validated = await bcrypt.compare(req.body.Password, User.Password);
    !validated && res.send("Wrong Password");
    const { Password, ...other } = User._doc;
    res.json(other);
  } catch (error) {}
});
module.exports = router;
