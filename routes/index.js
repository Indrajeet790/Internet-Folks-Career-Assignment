const express = require("express");
const router = express.Router();
 
router.use("/",require("./userSignUp"))
module.exports=router;