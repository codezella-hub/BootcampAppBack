const express = require('express');
const router = express.Router();
const likeController = require('../controller/likeController');
const validate = require('../middleware/validate');


router.post('/likes', likeController.addLike);
router.delete('/likes', likeController.removeLike);
router.get('/forums/:forumId/likes', likeController.showLikesByForum);
router.get('/forums/:forumId/like-count', likeController.countLikesByForum);

module.exports = router;
