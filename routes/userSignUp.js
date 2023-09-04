const express = require("express");
const router = express.Router();
const userController=require("../Controllers/user")

router.post("/v1/sign_up",userController.SignUp)
module.exports=router;