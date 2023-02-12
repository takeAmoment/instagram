const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const User = require("../models/user");

module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({message: "Unauthorized"});
        };

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findOne({_id: decoded.id});
        if (!user) {
            return res.status(400).json({message: "Uncorrect token"});
        }; 
        req.user = decoded;
        next();

        
    } catch (error) {
        res.status(401).json({message: "Unauthorized"});
    }

}