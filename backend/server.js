const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoute = require('./routes/auth')
const hotelRoute = require('./routes/hotels')
const roomRoute = require('./routes/rooms')
const userRoute = require('./routes/users')

const cookieParser = require('cookie-parser');

//express app
const app = express();

//middleware

app.use(cookieParser());
app.use(express.json());

app.use((req, res,next) => {
    console.log(req.path, req.method);
    next();
});

mongoose.set('strictQuery', true);

//route
app.use('/api/auth',authRoute);
app.use('/api/hotels',hotelRoute);
app.use('/api/rooms',roomRoute);
app.use('/api/users',userRoute);

//connect to db

// mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log("connect to db and listening port :", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Error");
  });
