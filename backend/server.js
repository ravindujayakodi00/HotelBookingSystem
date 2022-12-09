const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//route


//connect to db

mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log("connect to db and lisning port :", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Error");
  });
