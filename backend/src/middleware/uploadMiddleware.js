import multer from "multer";
import path from "path";

// Configure storage to save files into the uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // 1. Determine the prefix based on the file type
    let prefix = "Doc"; // A fallback just in case it's neither
    
    if (file.mimetype.startsWith("image/")) {
      prefix = "Img";
    } else if (file.mimetype.startsWith("video/")) {
      prefix = "Vid";
    }

    // 2. Generate the unique string
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    
    // 3. Piece it all together: Img-16843...984.jpg
    const finalFileName = `${prefix}-${uniqueSuffix}${path.extname(file.originalname)}`;
    
    cb(null, finalFileName);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1024 // 1 GB limit
  }
});

export default upload;