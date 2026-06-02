import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import fs from "fs"; // Built-in Node.js tool to handle directories safely

// Configure Cloudinary with your .env credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary Storage while retaining your custom naming logic
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let prefix = "Doc";
    if (file.mimetype.startsWith("image/")) {
      prefix = "Img";
    } else if (file.mimetype.startsWith("video/")) {
      prefix = "Vid";
    }

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);

    return {
      folder: "uploads", 
      resource_type: "auto", 
      public_id: `${prefix}-${uniqueSuffix}` 
    };
  }
});

// To create a storage engine that first saves the file to local disk and then uploads it to Cloudinary
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Automatically create the 'uploads' directory on Render if Git left it out
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads", { recursive: true });
    }
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
    
    const extIndex = file.originalname.lastIndexOf('.');
    const ext = extIndex !== -1 ? file.originalname.substring(extIndex) : '';
    const finalFileName = `${prefix}-${uniqueSuffix}${ext}`;
    
    cb(null, finalFileName);
  }
});

// To save file locally and then upload to Cloudinary 
const hybridStorage = {
  _handleFile: (req, file, cb) => {
    diskStorage._handleFile(req, file, async (err, info) => {
      if (err) return cb(err);

      try {
        const extIndex = info.filename.lastIndexOf('.');
        const publicId = extIndex !== -1 ? info.filename.substring(0, extIndex) : info.filename;

        const uploadResult = await cloudinary.uploader.upload(info.path, {
          folder: "uploads",
          resource_type: "auto",
          public_id: publicId
        });

        cb(null, {
          ...info,
          cloudinaryUrl: uploadResult.secure_url
        });
      } catch (uploadError) {
        console.error("Cloudinary sync failed, falling back to local disk storage:", uploadError);
        cb(null, info);
      }
    });
  },
  _removeFile: (req, file, cb) => {
    diskStorage._removeFile(req, file, cb);
  }
};

// Initialize Multer with the hybrid storage engine and your original size limit
const upload = multer({ 
  storage: hybridStorage, 
  limits: {
    fileSize: 1024 * 1024 * 1024 
  }
});

export default upload;