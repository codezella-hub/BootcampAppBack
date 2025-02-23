const express = require('express');
const router = express.Router();
const forumController = require('../controller/forumController');
const validate = require('../middleware/validate');


router.post('/forums', validate.validateForum, forumController.addForum);
router.get('/forums', forumController.showAllForums);
router.get('/forums/:id', forumController.showForumById);
router.put('/forums/:id', validate.validateForum, forumController.updateForum);
router.delete('/forums/:id', forumController.deleteForum);

module.exports = router;
