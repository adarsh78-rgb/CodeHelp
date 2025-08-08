const express = require('express');
const router = express.Router();
const aiController = require("../controllers/aiControllers.js")


router.post("/get-review",aiController.getResponse)
router.post("/get-code",aiController.getCode)

module.exports = router