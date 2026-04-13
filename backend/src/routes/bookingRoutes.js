import express from "express";
import {
  createBooking,
  deleteBooking,
//   getAllBookings,
  getMyBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { optionalProtect, protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { getAllBookings } from "../controllers/adminController.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.post("/", optionalProtect, createBooking);
router.get("/my", protect, getMyBookings);
router.delete("/:id", protect, deleteBooking);
router.get("/", protect, getAllBookings); // Admin route to get all bookings
router.put("/:id/status", protect, isAdmin, updateBookingStatus);

export default router;