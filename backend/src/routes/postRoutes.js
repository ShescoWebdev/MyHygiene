import express from "express";
import multer from "multer";
import path from "path";
import { 
  createPost, 
  getAllPosts, 
  toggleLikePost, 
  updatePost, 
  deletePost,
  deleteMultiplePosts 
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// --- CUSTOM UPLOAD HANDLER ---
// This catches Multer errors before they crash the app
const handleUpload = (req, res, next) => {
  const uploadSingle = upload.single("file"); 

  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File is too large. Maximum size is 1GB." });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "Server error during upload." });
    }
    // If no errors, move on to your controller
    next();
  });
};

// --- ROUTES ---

// Public route to view posts 
router.get("/", getAllPosts);

// To create posts (Notice how handleUpload replaces upload.single)
router.post("/", protect, isAdmin, handleUpload, createPost);

// To edit/update a post
router.put("/:id", protect, isAdmin, handleUpload, updatePost);

// To bulk delete posts
router.post("/bulk-delete", protect, isAdmin, deleteMultiplePosts);

// To delete a single post
router.delete("/:id", protect, isAdmin, deletePost);

// To Like/Unlike a post
router.put("/:id/like", protect, toggleLikePost);

export default router;