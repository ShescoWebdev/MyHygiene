import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

//To load environment variables from .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// To create a Cloudinary storage engine for Multer that handles all file types and generates unique public IDs
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let prefix = "Doc";
    if (file.mimetype.startsWith("image/")) {
      prefix = "Img";
    } else if (file.mimetype.startsWith("video/")) {
      prefix = "Vid";
    }

    // To generate the unique string
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
    
    // To extract the file extension from the original filename and append it to the new filename
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

        // To upload the newly created local file to Cloudinary
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