const express = require("express");
const mongoose = require("mongoose");
const Farm = require("./models/Farm.js");

const app = express();
 
const dbURL = process.env.DB_URL || "mongodb://127.0.0.1:27017/Farms";

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Mongo Connection open");
  })
  .catch((err) => {
    console.log("Mongo connection error");
    console.log(err);
  });


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


// get all the farms
app.get("/farms", async(req, res) => {
    try {
        const farms = await Farm.find({});
        res.send(farms);
    } catch (error) {
        res.status(500).send(error);
    }
})



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
