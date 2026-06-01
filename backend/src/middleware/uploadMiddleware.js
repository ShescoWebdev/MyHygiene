import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// To load environment variables from .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// To create a storage engine that first saves the file to local disk and then uploads it to Cloudinary
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    let prefix = "Doc";
    if (file.mimetype.startsWith("image/")) {
      prefix = "Img";
    } else if (file.mimetype.startsWith("video/")) {
      prefix = "Vid";
    }

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const finalFileName = `${prefix}-${uniqueSuffix}${path.extname(file.originalname)}`;
    
    cb(null, finalFileName);
  }
});

// To save file locally and then upload to Cloudinary 
const hybridStorage = {
  _handleFile: (req, file, cb) => {
    // To let diskStorage write the file to backend/uploads/ folder
    diskStorage._handleFile(req, file, async (err, info) => {
      if (err) return cb(err);

      try {

        const publicId = path.parse(info.filename).name;

        // To upload the newly created local file straight to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(info.path, {
          folder: "uploads",
          resource_type: "auto",
          public_id: publicId
        });

        // To add the Cloudinary URL to the file info object so it can be accessed in the route handler
        cb(null, {
          ...info,
          cloudinaryUrl: uploadResult.secure_url
        });
      } catch (uploadError) {
        console.error("Cloudinary sync failed, falling back to local disk storage:", uploadError);
        // If Cloudinary fails for any reason, fall back gracefully so your local app doesn't crash
        cb(null, info);
      }
    });
  },
  _removeFile: (req, file, cb) => {
    diskStorage._removeFile(req, file, cb);
  }
};

// To initialize Multer with hybrid storage engine and original size limit
const upload = multer({ 
  storage: hybridStorage,
  limits: {
    fileSize: 1024 * 1024 * 1024 // 1 GB limit
  }
});

export default upload;