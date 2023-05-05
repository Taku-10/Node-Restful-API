const express = require("express");
const mongoose = require("mongoose");
const Farm = require("../m")

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


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
