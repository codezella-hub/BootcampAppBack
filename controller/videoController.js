const cloudinary = require('cloudinary').v2;  // Use require instead of import
const Video = require('../models/video');   // Import Video model using require
const dotenv = require('dotenv');  // Use require instead of import

dotenv.config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Video upload function
const addVideo = async (req, res) => {
    try {
        // Check if video file exists
        const videoFile = req.files.video && req.files.video[0];  // video field
        if (!videoFile) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        // Check if thumbnail file exists
        const thumbnailFile = req.files.thumbnail && req.files.thumbnail[0];  // thumbnail field
        if (!thumbnailFile) {
            return res.status(400).json({ message: 'No thumbnail file uploaded' });
        }

        // Extract the video file name for title
        const title = videoFile.originalname.split('.').slice(0, -1).join('.');  // Removing the file extension for title

        // Upload video to Cloudinary
        const uploadVideoResult = await cloudinary.uploader.upload(videoFile.path, {
            resource_type: 'video',  // Specify that it is a video
            public_id: `videos/${title}`,  // Unique ID for the video
            folder: 'course_videos', // Folder in Cloudinary
        });

        // Upload thumbnail to Cloudinary
        const uploadThumbnailResult = await cloudinary.uploader.upload(thumbnailFile.path, {
            resource_type: 'image',  // Specify that it is an image
            public_id: `thumbnails/${title}`,  // Unique ID for the thumbnail
            folder: 'course_thumbnails', // Folder in Cloudinary
        });

        // Create a new video record in the database
        const newVideo = new Video({
            title: title,  // Set title from file name
            url: uploadVideoResult.secure_url,  // Cloudinary URL for video
            thumbnail: uploadThumbnailResult.secure_url,  // Cloudinary URL for thumbnail
            duration: req.body.duration,  // Duration in seconds (this should come from the client)
            order: req.body.order,  // Order value (this should come from the client)
            subCourse: req.body.subCourse  // SubCourse ID (this should come from the client)
        });

        // Save the video to the database
        await newVideo.save();

        // Return success response
        res.status(201).json(newVideo);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error uploading video and thumbnail' });
    }
};

module.exports = { addVideo };  // Use module.exports instead of export