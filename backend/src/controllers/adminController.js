import Booking from "../models/Booking.js";

export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
};