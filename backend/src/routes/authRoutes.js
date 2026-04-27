import express from "express";
import multer from "multer";
import { registerUser, loginUser, updateProfilePic, protect } from "../controllers/authController.js";

const router = express.Router();

// Set up Multer to store the file temporarily in memory
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, 
  }
});

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route to upload the picture
router.put("/profile-pic", protect, upload.single("image"), updateProfilePic);

export default router;