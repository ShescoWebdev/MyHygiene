import express from "express";
import { registerUser, loginUser, updateProfilePic, protect } from "../controllers/authController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route to upload the picture
router.put("/profile-pic", protect, upload.single("image"), updateProfilePic);

export default router;