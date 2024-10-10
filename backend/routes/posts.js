const express = require('express')
const router = express.Router()
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const verifyToken = require("../verifyToken")
const cloudinary = require('cloudinary')

// Create
router.post("/create", verifyToken, async (req, res) => {
    try {
        let myCloud;
        if (req.body.photo) { // Check if photo is present in the request
            try {
                // Upload the photo to Cloudinary
                myCloud = await cloudinary.v2.uploader.upload(req.body.photo, {
                    folder: "posts",
                    width: 3000, // Set your desired width
                    height: 1600, // Set your desired height
                    crop: "scale",
                });
            } catch (err) {
                console.error("Error uploading photo to Cloudinary:", err);
                return res.status(500).json({ error: "Cloudinary upload failed" });
            }
        }

        // Create a new post object
        const newPost = new Post({
            title: req.body.title,
            desc: req.body.desc,
            username: req.body.username,
            userId: req.body.userId,
            categories: req.body.categories,
            photo: myCloud ? myCloud.secure_url : "", // Save the photo URL from Cloudinary
        });

        // Save the post in the database
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        console.error("Error saving post:", err);
        res.status(500).json({ error: "Server error" });
    }
});



// Update
router.put("/:id", verifyToken, async (req, res) => {
    try {
        // Find the existing post to get the old image URL
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        let myCloud;
        if (req.body.photo) {
            // Destroy the previous image if it exists
            if (post.photo) {
                const publicId = post.photo.split('/').pop().split('.')[0]; // Extract the public ID from the URL
                await cloudinary.v2.uploader.destroy(`posts/${publicId}`);
            }

            // Upload the new image to Cloudinary
            try {
                myCloud = await cloudinary.v2.uploader.upload(req.body.photo, {
                    folder: "posts",
                    width: 3000, // Set your desired width
                    height: 1600,
                    crop: "scale",
                });
            } catch (err) {
                console.error("Error uploading photo to Cloudinary:", err);
                return res.status(500).json({ error: "Cloudinary upload failed" });
            }
        }

        // Update the post with the new data
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    ...req.body,
                    photo: myCloud ? myCloud.secure_url : post.photo, // Update photo if new one is uploaded
                },
            },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        console.error("Error updating post:", err);
        res.status(500).json({ error: "Server error" });
    }
});


// Delete
router.delete("/:id", verifyToken, async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

            if (post.photo) {
                const publicId = post.photo.split('/').pop().split('.')[0]; // Extract the public ID from the URL
                await cloudinary.v2.uploader.destroy(`posts/${publicId}`);
            }
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post has been deleted!")
        
    } catch (err) {
        res.status(500).json(err)
    }
})


// Get post details
router.get("/:id", async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
        
    } catch (err) {
        res.status(500).json(err)
    }
})


// Get posts
router.get("/", async(req,res) => {
    const query = req.query
    try {
        const searchFilter = {
            title:{$regex:query.search, $options: "i"}
        }
        const posts = await Post.find(query.search ? searchFilter : null)
        res.status(200).json(posts)
        
    } catch (err) {
        res.status(500).json(err)
    }
})


// Get user posts
router.get("/user/:userId", async(req,res) => {
    try {
        const posts = await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router