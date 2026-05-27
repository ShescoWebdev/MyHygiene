import express from "express";
import { 
    getActivities, 
    markAllAsRead, 
    createActivityLog, 
    deleteActivity, 
    deleteAllActivities 
} from "../controllers/activityController.js";

const router = express.Router();

// Assuming you have your auth middleware to protect admin routes
// import { protect, admin } from "../middleware/authMiddleware.js";

router.get("/", /* protect, admin, */ getActivities);
router.put("/mark-read", /* protect, admin, */ markAllAsRead);
router.post("/", createActivityLog);
router.delete("/:id", deleteActivity); // Deletes one item by ID
router.delete("/", deleteAllActivities); // Deletes everything

export default router;