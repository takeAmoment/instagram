const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fileUpload = require("express-fileupload");

const PORT = 3002;
const {mongodbUri} = require("./keys");

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(fileUpload({
    createParentPath: true
}));
app.use(require("./routes/auth.router"));
app.use(require("./routes/post.router"));
app.use(require("./routes/user.router"));

async function start() {
    try {
        await mongoose.connect(mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
        
    } catch (error) {
        console.log(error);
        process.on("exit", 1);
    }
};

start();
 
