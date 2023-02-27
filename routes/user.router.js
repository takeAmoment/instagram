const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth.middleware");
const User = require("../models/user");
const Post = require("../models/post");
const Uuid = require("uuid");

router.get("/user/:id", auth, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id}).select("-password");

        if (!user) {
            return res.status(404).json({message: "User was not found"});
        }
        
        const posts = await Post.find({postedBy: req.params.id}).populate("postedBy", "_id name");
        
        res.json({user, posts});

    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
});
router.get("/user", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.json(user)
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
});

router.patch("/userupdate", auth, async (req,res) => {
    try {
        const { name, email, info} = req.body;
        const file = req.files?.file ?? '';
        const user = await User.findOne({_id: req.user._id});

        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (info) {
            user.info = info;
        }
        if (file) {
            const fileName = Uuid.v4() + file.name;
            file.mv(`/Users/sasha/Desktop/code/express/insta/instagram/client/public/uploads/${fileName}`, err => {
                if (err) {
                    res.status(500).send(err);
                }
            });
            user.avatar = fileName;
        }
        await user.save();
        res.json(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Serever error"});
    }
});

router.put("/follow", auth, async (req, res) => {
    try {
        const options = { new: true };
        const followerUser = await User.findByIdAndUpdate(req.body.followId, {
            $push: {followers: req.user._id}
        }, options);
        if (!followerUser) {
            return res.status(422).json({message: "Error"});
        }

        const user = await User.findByIdAndUpdate(req.user._id, {
            $push: {following: req.body.followId},
        }, options);

        if (!user) {
            return res.status(422).json({message: "Error"});
        }

        res.json(followerUser);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
});

router.put("/unfollow", auth, async (req, res) => {
    try {
        const options = { new: true };
        const followerUser = await User.findByIdAndUpdate(req.body.followId, {
            $pull: {followers: req.user._id}
        }, options);
        if (!followerUser) {
            return res.status(422).json({message: "Error"});
        }

        const user = await User.findByIdAndUpdate(req.user._id, {
            $pull: {following: req.body.followId},
        }, options);

        if (!user) {
            return res.status(422).json({message: "Error"});
        }

        res.json(followerUser);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
})

module.exports = router;