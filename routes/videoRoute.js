
const express = require('express');
const multer = require('multer');
const { addVideo } = require('../controller/videoController');  // Use require instead of import

const router = express.Router();

// Multer setup for temporary file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Store temporarily in a folder called `uploads`
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Use the original file name
    }
});

// Create an upload instance that handles multiple fields
const upload = multer({ storage: storage });

// Route to upload video and thumbnail
router.post('/addVideo', upload.fields([
    { name: 'video', maxCount: 1 },        // Video field
    { name: 'thumbnail', maxCount: 1 }     // Thumbnail field
]) , addVideo);

module.exports = router;  // Use module.exports instead of export default
