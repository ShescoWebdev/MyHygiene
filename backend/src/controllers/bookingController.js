import Booking from "../models/Booking.js";
import sendEmail from "../services/emailService.js";
import { sendWhatsApp } from "../services/whatsappService.js";

export const createBooking = async (req, res) => {
  try {
    const { name, phone, email, service, date, time, address, items, instructions } = req.body;

    //  SANITIZE INPUTS (Defeats the sneaky mobile keyboard spaces!)
    const cleanEmail = email ? email.trim().toLowerCase() : "";
    const cleanPhone = phone ? phone.trim() : "";

    const booking = await Booking.create({
      user: req.user ? req.user._id : null,
      name: name.trim(),
      phone: cleanPhone,
      email: cleanEmail,
      service,
      date,
      time,
      address,
      items,
      instructions,
    });

    //  RUN NOTIFICATIONS INDEPENDENTLY (Using Promise.allSettled)
    // This ensures that if WhatsApp fails, Email still sends, and vice versa
    Promise.allSettled([
      sendEmail(booking),
      sendWhatsApp(booking)
    ]).then(results => {
      // This will quietly log any errors in server without crashing the app
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          const type = index === 0 ? "Email" : "WhatsApp";
          console.error(`🚨 ${type} Notification Failed:`, result.reason);
        }
      });
    });

    // IMMEDIATELY RESPOND TO FRONTEND (Makes the app feel super fast)
    res.status(201).json(booking);

  } catch (err) {
    console.error("ERROR CREATING BOOKING:", err.message);
    res.status(500).json({ message: "Failed to create booking" });
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