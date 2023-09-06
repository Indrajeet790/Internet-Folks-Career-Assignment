const express = require("express");
const router = express.Router();
const userController=require("../Controllers/user")

router.post("/sign_up",userController.SignUp)
module.exports=router;