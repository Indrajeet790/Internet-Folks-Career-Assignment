const express = require("express");
const router = express.Router();
const communityController=require("../Controllers/communityController")

router.post("/create",communityController.createCommunity)
// Get My Owned Community
router.get("/me/owner",communityController.getOwnCommunities)
// get all community
router.get("/",communityController.getAllCommunity)
module.exports=router;