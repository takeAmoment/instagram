const {Schema, model, Types} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    followers: [{type: Types.ObjectId, ref: "User"}],
    following: [{type: Types.ObjectId, ref: "User"}],
});
module.exports = model("User", userSchema);