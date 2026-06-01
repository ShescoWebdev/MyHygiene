import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// To load environment variables from .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// To create a Cloudinary storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // To determine the prefix based on the file type
    let prefix = "Doc";
    if (file.mimetype.startsWith("image/")) {
      prefix = "Img";
    } else if (file.mimetype.startsWith("video/")) {
      prefix = "Vid";
    }

    // To generate the unique string
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);

    return {
      folder: "uploads", // Creates an "uploads" folder in Cloudinary dashboard
      resource_type: "auto", // Allows Cloudinary to accept videos, images, and raw files without crashing
      public_id: `${prefix}-${uniqueSuffix}` // Cloudinary automatically handles and appends the correct file extension
    };
  }
});

// To initialize Multer with the Cloudinary storage and original size limit
const upload = multer({ 
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1024 // 1 GB limit
  }
});

export default upload;