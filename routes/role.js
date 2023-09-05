const express = require('express');
const router = express.Router();
const roleController = require("../Controllers/roleController")



// Role
router.post('/create', roleController.createRole);
router.get('/getAll', roleController.getAllRole);

module.exports = router;
