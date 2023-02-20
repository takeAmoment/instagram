const { model, Schema, Types } = require("mongoose");

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: "no photo",
    },
    likes: [{ type: Types.ObjectId, ref: "User"}],
    postedBy: {
        type: Types.ObjectId,
        ref: "User",
    }
});

module.exports = model("Post", postSchema);