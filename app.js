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

// Get a specific farm by ID
app.get("/farms/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const farm = await Farm.findById(id);
        if (!farm) {
            return res.status(404).send("Farm not found");
        }
        res.send(farm);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post("/farms", async(req, res) => {
    try {
        const farm = new farm(req.body);
        await farm.save();
        res.status(201).send(farm);
    } catch (error) {
        res.status(400).send(error);
    }
})

app.put("/farms/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const farm = await Farm.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        if (!farm) {
            return res.status(404).send("Farm not found");
        }
        res.send(farm);
    } catch(error) {
        res.status(400).send(error);
    }
})



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
