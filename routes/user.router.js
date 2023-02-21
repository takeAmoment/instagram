const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth.middleware");
const User = require("../models/user");
const Post = require("../models/post");

router.get("/user/:id", auth, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id}).select("-password");

        if (!user) {
            return res.status(404).json({message: "User was not found"});
        }
        
        const posts = await Post.find({postedBy: req.params.id}).populate("postedBy", "_id name");
        
        res.json({user, posts});

    } catch (error) {
        
    }
});

module.exports = router;