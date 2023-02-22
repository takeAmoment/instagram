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
    info: {
        type: String,
        default: '',
    },
    avatar: {
        type: String,
        default: "",
    },
    followers: [{type: Types.ObjectId, ref: "User"}],
    following: [{type: Types.ObjectId, ref: "User"}],
});
module.exports = model("User", userSchema);