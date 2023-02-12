const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth.middleware");
const Post = require("../models/post");

router.post("/create", auth, async(req, res) => {
    try {
        const { title, body, photo } = req.body;

        if(!title || !body) {
            return res.status(422).json({message: "Uncorrect data"});
        }
       
        const post = new Post({title, body, photo, postedBy: req.user.id});

        await post.save();
        res.status(201).json({message: "post was created"})
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
} )

module.exports = router;