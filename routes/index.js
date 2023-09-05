const express = require("express");
const router = express.Router();
 
router.use("/",require("./userSignUp"))
router.use("/",require("./userSignIn"))
router.use("/v1/role",require("./role"))
module.exports=router;