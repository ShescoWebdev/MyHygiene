import Booking from "../models/Booking.js";
import sendEmail from "../services/emailService.js";
import { sendWhatsApp } from "../services/whatsappService.js";


// Create booking
export const createBooking = async (req, res) => {
    await sendEmail(booking);
    await sendWhatsApp(booking);
  const { name, phone, service, date, address, items, instructions } = req.body;

  const booking = await Booking.create({
  user: req.user._id,
  name,
  phone,
  service,
  date,
  address,
  items,
  instructions,
   });

  res.status(201).json(booking);
  };

  // Get user bookings
  export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id });
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