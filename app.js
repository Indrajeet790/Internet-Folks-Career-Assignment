const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
require("dotenv").config();
const passport=require("passport")
const jsonWebToken=require("jsonwebtoken");
const passportJwt=require("./config/passport-jwt")




app.use(express.json());
app.use(express.urlencoded({
extended:true
}));

// routes
app.use("/", require("./routes"));





app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
  } else {
    console.log(`server is running on port ${port}`);
  }
});
