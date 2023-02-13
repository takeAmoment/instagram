const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = 3001;
const {mongodbUri} = require("./keys");

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(require("./routes/auth.router"));
app.use(require("./routes/post.router"));

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
 
