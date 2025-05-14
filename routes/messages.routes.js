const express = require('express');
const router = express.Router();
const {getUsersForSidebar,getMessages,sendMessage} = require("../controller/messages.controller");
const verifyToken = require("../middleware/verifyToken");


router.get("/users", verifyToken, getUsersForSidebar);
router.get("/:id", verifyToken, getMessages);

router.post("/send/:id", verifyToken, sendMessage);

module.exports = router;