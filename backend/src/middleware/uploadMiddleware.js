import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary configuration from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// To export cloudinary to make it shareable for other parts in the application
export { cloudinary };

// To set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let prefix = "Doc";
    if (file.mimetype.startsWith("image/")) prefix = "Img";
    else if (file.mimetype.startsWith("video/")) prefix = "Vid";

    // To generate a unique suffix using timestamp and random number to avoid filename collisions
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    return {
      folder: "uploads",
      resource_type: "auto", // To handle both images and videos automatically
      public_id: `${prefix}-${uniqueSuffix}`,
    };
  },
});

// To limit the file size to 1GB per individual file
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB per individual file
});

export default upload;