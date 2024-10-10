const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// Register
router.post("/register", async(req,res) => {
    try{
        const { username, email, password } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password,salt)
        const newUser = new User({ username, email, password:hashedPassword })
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
})


// Login 
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Wrong Credentials!" });
        }

        const token = jwt.sign(
            { _id: user._id, username: user.username, email: user.email },
            process.env.SECRET,
            { expiresIn: "10d" }
        );

        const { password, ...info } = user._doc;

        res.status(200).json({
            success: true,
            info,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});



// Logout
router.get("/logout", async(req,res) => {
    try{
        res.clearCookie("token", {sameSite:"none",secure:"true"}).status(200).json("User logged out successfully.")
    }
    catch(err){
        res.status(500).json(err)
    }
})


// Refetch User
router.get("/refetch", (req,res) => {
    const authHeader = req.headers['authorization'];
   
    if(!authHeader){
        return res.status(401).json("Welcome and Login!")
    } 
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json("Welcome and Login!")
       
    } 
    jwt.verify(token,process.env.SECRET,{},async(err,data) => {
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})

module.exports = router