const express = require("express");
const router = express.Router();
 
router.use("/",require("./userSignUp"))
router.use("/",require("./userSignIn"))
module.exports=router;