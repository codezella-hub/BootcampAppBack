const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME1,
  api_key: process.env.CLOUDINARY_API_KEY1,
  api_secret: process.env.CLOUDINARY_API_SECRET1,
});

module.exports = cloudinary;
