const express = require('express');
const router = express.Router();
const VideoProgressController = require('../controller/VideoProgressController');


// Create Video Progress
router.post('/AddVideoProgress', VideoProgressController.createVideoProgress);

// Get Video Progress by ID
router.get('/videoProgress/:id', VideoProgressController.getVideoProgressById);

// Get All Video Progresses
router.get('/videoProgresses', VideoProgressController.getAllVideoProgresses);

// Update Video Progress
router.put('/UpdateVideoProgress/:id', VideoProgressController.updateVideoProgress);

// Delete Video Progress
router.delete('/videoProgress/:id', VideoProgressController.deleteVideoProgress);

module.exports = router;
