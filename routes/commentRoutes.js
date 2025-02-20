const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');
const validate = require('../middleware/validate');

router.post('/comments', validate.validateComment, commentController.addComment);
router.get('/forums/:forumId/comments', commentController.showCommentsByForum);
router.put('/comments/:id', validate.validateComment, commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
