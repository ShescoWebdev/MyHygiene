import express from "express";
import { 
    getActivities, 
    markAllAsRead, 
    createActivityLog, 
    deleteActivity, 
    deleteAllActivities 
} from "../controllers/activityController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/",  protect, isAdmin,  getActivities);
router.put("/mark-read",protect, isAdmin, markAllAsRead);
router.post("/", createActivityLog);
router.delete("/:id", deleteActivity);
router.delete("/", deleteAllActivities);

export default router;