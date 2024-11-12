const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const Product = require("./models/Product");
const User = require("./models/User");
const app = express();

const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/', require('./routes/auth'));
app.use('/products', require('./routes/products'));

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB");
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
