const express = require("express");
const router = express.Router();
const userController=require("../Controllers/user")

router.post("/signIn",userController.SignIn)
module.exports=router;