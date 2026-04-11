import Booking from "../models/Booking.js";
import sendEmail from "../services/emailService.js";
import { sendWhatsApp } from "../services/whatsappService.js";


// Create booking
export const createBooking = async (req, res) => {
  try {
    const { name, phone, email, service, date, address, items, instructions } = req.body;

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

    // AFTER creating booking
    await sendEmail(booking);
    await sendWhatsApp(booking);

    res.status(201).json(booking);
  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Something went wrong ❌");
  }
};

  // Get user bookings
  export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(bookings);
  };

  export const deleteBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  await booking.deleteOne();

  res.json({ message: "Booking removed" });
};

// Update booking status (Admin)
export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: "Status updated", booking });
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
};