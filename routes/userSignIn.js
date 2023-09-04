const express = require("express");
const router = express.Router();
const userController=require("../Controllers/user")

router.post("/v1/signIn",userController.SignIn)
module.exports=router;