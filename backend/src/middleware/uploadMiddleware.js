import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Allows up to 10 Megabytes
  }
});

export default upload;