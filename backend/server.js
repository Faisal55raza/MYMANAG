const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const cloudinary = require('cloudinary')
const bodyParser = require('body-parser')


// Database
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database is connected successfully.")
    } catch (err) {
        console.log(err)
    }
}

// Middlewares
dotenv.config()
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:["https://mymanag-faisal.vercel.app","http://localhost:5173",],    
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "credentials","withCredentials"],
    credentials: true
}));
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_SECRET_KEY,

})

app.listen(process.env.PORT, ()=> {
    connectDB()
    console.log("App is running on port " + process.env.PORT)
})