import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { getAllBookings } from "../controllers/adminController.js";

const router = express.Router();

router.get("/bookings", protect, isAdmin, getAllBookings);

export default router;