import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsApp = async (booking) => {
  await client.messages.create({
    from: "whatsapp:+16626492404", // Twilio sandbox
    to: "whatsapp:+2348145364748", // team number (Gladys. For the team)
    body: `🧹 New Booking:
Name: ${booking.name}
Service: ${booking.service}
Address: ${booking.address}
Date: ${booking.date}`,
  });
};