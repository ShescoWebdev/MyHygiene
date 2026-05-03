import express from "express";
import { createPost, getAllPosts, toggleLikePost } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

// Public route to view posts (Supports pagination: ?page=1&limit=10)
router.get("/", getAllPosts);

// Protected admin route to create posts
router.post("/upload", protect, isAdmin, upload.single("media"), createPost);

// NEW: Protected route to Like/Unlike a post (Any logged-in user can like)
router.put("/:id/like", protect, toggleLikePost);

export default router;