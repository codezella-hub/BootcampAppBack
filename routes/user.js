const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

//add joueur
router.post('/addUser',userController.addUser);

module.exports = router;