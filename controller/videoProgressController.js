const VideoProgress = require('../models/videoProgress');

// Create Video Progress
const createVideoProgress = async (req, res) => {
    try {
        const { user, video, watchedDuration, completedPercentage, completed } = req.body;

        // Check if the video progress already exists for the user and video
        const existingProgress = await VideoProgress.findOne({ user, video });
        if (existingProgress) {
            return res.status(400).json({ message: 'Video progress already exists for this user and video' });
        }

        // Create a new video progress with default values
        const newVideoProgress = new VideoProgress({
            user,
            video,
            watchedDuration: watchedDuration || 0, // Default to 0 if not provided
            completedPercentage: completedPercentage || 0, // Default to 0 if not provided
            completed: completed || false, // Default to false if not provided
        });

        // Save the video progress to the database
        await newVideoProgress.save();

        // Return the created video progress
        res.status(201).json(newVideoProgress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating video progress' });
    }
};

// Get Video Progress by ID
const getVideoProgressById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the video progress by ID
        const videoProgress = await VideoProgress.findById(id).populate('user video');
        if (!videoProgress) {
            return res.status(404).json({ message: 'Video progress not found' });
        }

        // Return the video progress
        res.status(200).json(videoProgress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving video progress' });
    }
};

// Get All Video Progresses
const getAllVideoProgresses = async (req, res) => {
    try {
        // Find all video progresses and populate user and video details
        const videoProgresses = await VideoProgress.find().populate('user video');
        res.status(200).json(videoProgresses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving video progresses' });
    }
};

// Update Video Progress
const updateVideoProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const { watchedDuration, completedPercentage, completed } = req.body;

        // Find and update the video progress
        const updatedVideoProgress = await VideoProgress.findByIdAndUpdate(
            id,
            { watchedDuration, completedPercentage, completed, lastWatched: Date.now() },
            { new: true, runValidators: true }
        );

        // Check if the video progress was found and updated
        if (!updatedVideoProgress) {
            return res.status(404).json({ message: 'Video progress not found' });
        }

        // Return the updated video progress
        res.status(200).json(updatedVideoProgress);
    } catch (err) {
        console.error(err);

        // Handle validation errors
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }

        // Handle other errors
        res.status(500).json({ message: 'Error updating video progress' });
    }
};

// Delete Video Progress
const deleteVideoProgress = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the video progress
        const deletedVideoProgress = await VideoProgress.findByIdAndDelete(id);
        if (!deletedVideoProgress) {
            return res.status(404).json({ message: 'Video progress not found' });
        }

        // Return success message
        res.status(200).json({ message: 'Video progress deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting video progress' });
    }
};

module.exports = {
    createVideoProgress,
    getVideoProgressById,
    getAllVideoProgresses,
    updateVideoProgress,
    deleteVideoProgress,
};