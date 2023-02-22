const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth.middleware");
const Post = require("../models/post");
const Uuid = require("uuid");

router.get("/posts", auth, async (req, res) => {
    try {

        const posts = await Post.find()
        .sort({_id:-1})
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name");
        res.json({posts});
        
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
});

router.get("/getsubposts", auth, async(req, res) => {
    try {
        const posts = await Post.find({ postedBy: { $in: req.user.following }})
        .sort({_id:-1})
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name");

        res.json(posts);
        
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
});

router.post("/create", auth, async(req, res) => {
    try {
        const { title, body } = req.body;
        const file = req.files.file;

        if(!title || !body || !file) {
            return res.status(422).json({message: "Uncorrect data"});
        }
       
        const fileName = Uuid.v4() + file.name;
        file.mv(`/Users/sasha/Desktop/code/express/insta/instagram/client/public/uploads/${fileName}`, err => {
            if (err) {
                res.status(500).send(err);
            }
        });
        const post = new Post({title, body, photo: fileName, postedBy: req.user.id});

        await post.save();
        res.status(201).json({message: "post was created"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
});

router.get("/userposts", auth, async (req, res) => {
    try {
        const posts = await Post.find({postedBy: req.user._id}).sort({_id:-1});
        res.json({posts});
        
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
});

router.put("/like", auth, async (req, res) => {
    try {
        const options = { new: true };
        const updatedPost = await Post.findByIdAndUpdate(req.body.postId, {
            $push: {likes: req.user._id}
        }, options).populate("comments.postedBy", "_id name").populate("postedBy", "_id name");
        res.json(updatedPost);
        
    } catch (error) {
       res.status(500).json({message: "Server error"}); 
    }
});

router.put("/unlike", auth, async (req, res) => {
    try {
        const options = { new: true };
        const updatedPost = await Post.findByIdAndUpdate(req.body.postId, {
            $pull: {likes: req.user._id}
        }, options).populate("comments.postedBy", "_id name").populate("postedBy", "_id name");
        res.json(updatedPost);
        
    } catch (error) {
       res.status(500).json({message: "Server error"}); 
    }
});

router.put("/addComment", auth, async (req, res) => {
    try {
        const options = { new: true };
        const comment = {
            text: req.body.text,
            postedBy: req.user._id,
        }
        const updatedPost = await Post.findByIdAndUpdate(req.body.postId, {
            $push: {comments: comment}
        }, options).populate("comments.postedBy", "_id name").populate("postedBy", "_id name");
        res.json(updatedPost);
        
    } catch (error) {
       res.status(500).json({message: "Server error"}); 
    }
});
router.put("/removeComment", auth, async (req, res) => {
    try {
        const options = { new: true };
        const updatedPost = await Post.findByIdAndUpdate(req.body.postId, {
            $pull: { comments: {_id: req.body._id } }
        }, options).populate("comments.postedBy", "_id name").populate("postedBy", "_id name");
        res.json(updatedPost);
        
    } catch (error) {
       res.status(500).json({message: "Server error"}); 
    }
});

router.delete("/delete/:postId", auth, async (req, res) => {

    try {
        const post = await Post.findOne({_id: req.params.postId}).populate("postedBy", "_id");
        if (req.user._id.toString() !== post.postedBy._id.toString()) {
            return res.status(422).json({message: "Not your post"});
        }
        post.remove();
        res.json(post);
        
    } catch (error) {
       res.status(500).json({message: "Server error"}); 
    }
})


module.exports = router;