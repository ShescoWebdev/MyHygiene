  import Booking from "../models/Booking.js";
  import sendEmail from "../services/emailService.js";
  import { sendWhatsApp } from "../services/whatsappService.js";
  import { logActivity } from "./activityController.js";

  // To create a booking
  export const createBooking = async (req, res) => {
    try {
      const { name, phone, email, service, date, time, address, items, instructions } = req.body;

      // To clean and validate email and phone before saving
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

      // To trigger notifications and not await them, but respond to frontend immediately
      sendEmail(booking).catch(err => console.error("🚨 Email Failed:", err.message));
      sendWhatsApp(booking).catch(err => console.error("🚨 WhatsApp Failed:", err.message));
      await logActivity(req.body.name, `requested a ${req.body.service} booking`);
      return res.status(201).json(booking);

    } catch (err) {
      console.error("ERROR CREATING BOOKING:", err.message);
      if (!res.headersSent) {
        return res.status(500).json({ message: "Failed to create booking" });
      }
    }
  };

  // To get bookings
  export const getMyBookings = async (req, res) => {
    try {
      // Check if user exists first!
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Not authorized, user missing" });
      }

      const bookings = await Booking.find({ user: req.user._id });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };

  // To delete a booking
  export const deleteBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.deleteOne();
    res.json({ message: "Booking removed" });
  };

  // To update booking status (Admin only)
  export const updateBookingStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      const oldStatus = booking.status;
      booking.status = status || booking.status;
      
      await booking.save();

      // To trigger notifications if the status changed, but not await them to avoid delaying the response
      if (oldStatus !== booking.status) {
        sendEmail(booking, true).catch(err => console.error("🚨 Update Email Failed:", err.message));
        sendWhatsApp(booking, true).catch(err => console.error("🚨 Update WhatsApp Failed:", err.message));
      }

      return res.json({
        message: "Booking status updated",
        booking,
      });
      
    } catch (error) {
      console.error("STATUS UPDATE ERROR:", error.message);
      if (!res.headersSent) {
        return res.status(500).json({ message: "Failed to update booking status" });
      }
    }
  };