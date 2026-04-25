import express from "express";
import multer from "multer";
import { registerUser, loginUser, updateProfilePic, protect } from "../controllers/authController.js";

const router = express.Router();

// Set up Multer to store the file temporarily in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/register", registerUser);
router.post("/login", loginUser);

// NEW: Protected route to upload the picture
// upload.single("image") tells multer to look for a file attached as "image"
router.put("/profile-pic", protect, upload.single("image"), updateProfilePic);

export default router;