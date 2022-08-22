// importing core modules or other packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const DB =
  "mongodb+srv://ashutosh_asg:uMd968kvQDSyiy7@fyndlearn.e16ttjp.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is connected Successfully via Mongoose");
  })
  .catch((err) => console.log(err));

// config

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enabling cors (cross origin resource sharing)
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header(
    "Access-Controll-Allow-Headers",
    "Origin, X-Requested-With, Accept, Authorization, Content-Type"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Controll-Allow-Methods",
      "PUT, PUSH, PATCH, GET, DELETE"
    );
    res.status(200).json({});
  }
  next();
});

// custom coded modules

const userRoutes = require("./api/routes/user.js");
const productRoutes = require("./api/routes/product.js");
const orderRoutes = require("./api/routes/order.js");

// each resource gets its own routes

app.use("/users", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

app.get("/", (req, res, next) => {
  res.json({
    message: "congo",
  });
});

//
//
//
// 404 error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// catch-all error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
