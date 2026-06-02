import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary with your .env credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Files go DIRECTLY to Cloudinary — zero disk dependency, works on any server
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let prefix = "Doc";
    if (file.mimetype.startsWith("image/")) prefix = "Img";
    else if (file.mimetype.startsWith("video/")) prefix = "Vid";

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    return {
      folder: "uploads",
      resource_type: "auto",         // handles images AND videos
      public_id: `${prefix}-${uniqueSuffix}`,
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB
});

export default upload;