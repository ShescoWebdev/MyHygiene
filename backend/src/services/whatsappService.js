import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsApp = async (booking, isUpdate = false) => {
  // Format the Date
  const d = new Date(booking.date);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const formattedDate = booking.date 
    ? `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    : "Not specified";

  const timeStr = booking.time || "Not specified";

  let message = "";
  
  if (!isUpdate) {
    // Original Team Notification for NEW bookings
    message = `🧹 New Booking Received. Details below:\nName: ${booking.name}\nService: ${booking.service}\nAddress: ${booking.address}\nDate: ${formattedDate}\nTime: ${timeStr}`;
  } else if (booking.status === "Confirmed") {
    // Optional: Let the team know it was confirmed
    message = `✅ Update: Booking CONFIRMED for ${booking.name}.\nService: ${booking.service}\nDate: ${formattedDate}`;
  } else {
    // Don't send WhatsApp messages for other status changes
    return;
  }

  await client.messages.create({
    from: "whatsapp:+14155238886", // Twilio sandbox
    to: "whatsapp:+2348145364748", // team number
    body: message,
  });
};