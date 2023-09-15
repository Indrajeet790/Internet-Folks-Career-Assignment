const express = require("express");
const router = express.Router();
 
router.use("/v1",require("./userSignUp"))
router.use("/v1",require("./userSignIn"))
router.use("/v1/role",require("./role"))
router.use("/v1/community",require("./community"))
router.use("/v1/member",require("./member"))
module.exports=router;