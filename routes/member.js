const express = require('express');
const router = express.Router();
const memberController = require("../Controllers/member")
// const verifyToken=require("../config/verifyToken")



// member ruter
router.post('/create', memberController.addMember)
// router.post('/delete', memberController.removeMember)

module.exports = router;
