const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const router = express.Router();
const auth = require("../middleware/auth.middleware");


router.get("/", auth, async (req, res) => {
    res.send("hello");
});

router.post("/signup",  async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(422).json({ message: "Uncorrect data"});
        }

        const candidate = await User.findOne({email: email});

        if (candidate) {
            return res.status(400).json({message: "This user already exist"});
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const user  = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({message: "The user was created"});
        
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }

});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({message: "Uncorrect request"});
        };

        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(400).json({message: "This user does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: "Uncorrect password"});
        }

        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "3h"});

        res.json({token, userId: user.id});
        
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
})

module.exports = router;