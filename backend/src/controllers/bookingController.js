import Booking from "../models/Booking.js";
import sendEmail from "../services/emailService.js";
import { sendWhatsApp } from "../services/whatsappService.js";

// Create booking (FINAL SAVE ONLY)
export const createBooking = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      service,
      date,
      address,
      items,
      instructions,
    } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      name,
      phone,
      email,
      service,
      date,
      address,
      items,
      instructions,
    });

    // send notifications AFTER save
    await sendEmail(booking);
    await sendWhatsApp(booking);

    res.status(201).json(booking);
  } catch (err) {
    console.error("ERROR:", err.message);

    res.status(500).json({
      message: "Failed to create booking",
    });
  }
};

// Get user bookings
export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(bookings);
};

// Delete booking
export const deleteBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  await booking.deleteOne();

  res.json({ message: "Booking removed" });
};

// Update booking status (Admin only)
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = req.body.status || booking.status;

    await booking.save();

    res.json({
      message: "Booking status updated",
      booking,
    });
  } catch (error) {
    console.error("STATUS UPDATE ERROR:", error.message);
    res.status(500).json({ message: "Failed to update booking status" });
  }
};