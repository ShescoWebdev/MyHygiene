import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getMyBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.delete("/:id", protect, deleteBooking);
router.get("/", protect, getAllBookings);

export default router;