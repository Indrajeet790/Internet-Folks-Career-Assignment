const express = require("express");
const router = express.Router();
const communityController=require("../Controllers/communityController")

router.post("/create",communityController.createCommunity)
router.get("/me/owner",communityController.getOwnCommunities)
module.exports=router;