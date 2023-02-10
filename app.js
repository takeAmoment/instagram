const express = require("express");
const mongoose = require("mongoose");
require("./models/user");

const app = express();
const PORT = 3000;
mongoose.set("strictQuery", false);
const {mongodbUri} = require("./keys");

mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
    console.log("connected");
});
mongoose.connection.on("error", (err) => {
    console.log(err);
})
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

