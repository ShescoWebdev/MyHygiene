// THIRD VERSION
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsApp = async (booking) => {
  // Format the Date to a more human-friendly format
  const d = new Date(booking.date);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const formattedDate = booking.date 
    ? `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    : "Not specified";

  // Get the specific time
  const timeStr = booking.time || "Not specified";

  await client.messages.create({
    from: "whatsapp:+14155238886", // Twilio sandbox
    to: "whatsapp:+2348145364748", // team number (Gladys. For the team)
    body: `🧹 New Booking Received. Details below:
Name: ${booking.name}
Service: ${booking.service}
Address: ${booking.address}
Date: ${formattedDate}
Time: ${timeStr}`,
  });
};              



// SECOND VERSION
// import twilio from "twilio";

// const client = twilio(
//   process.env.TWILIO_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// export const sendWhatsApp = async (booking) => {
//   // 1. Convert the ugly string into a real Date object
//   const dateObj = new Date(booking.date);

//   // 2. Extract and format just the Date (e.g., Wed, April 15, 2026)
//   const formattedDate = dateObj.toLocaleDateString("en-US", {
//     weekday: "short",
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });

//   // 3. Extract and format just the Time (e.g., 4:00 PM)
//   const formattedTime = dateObj.toLocaleTimeString("en-US", {
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });

//   await client.messages.create({
//     from: "whatsapp:+14155238886", // Twilio sandbox
//     to: "whatsapp:+2348145364748", // team number (Gladys. For the team)
//     body: `🧹 New Booking Received. Details below:
// Name: ${booking.name}
// Service: ${booking.service}
// Address: ${booking.address}
// Date: ${formattedDate}
// Time: ${formattedTime}`,
//   });
// };




// FIRST VERSION
// import twilio from "twilio";

// const client = twilio(
//   process.env.TWILIO_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// export const sendWhatsApp = async (booking) => {
//   await client.messages.create({
//     from: "whatsapp:+14155238886", // Twilio sandbox
//     to: "whatsapp:+2348145364748", // team number (Gladys. For the team)
//     body: `🧹 New Booking Received. Details below:
// Name: ${booking.name}
// Service: ${booking.service}
// Address: ${booking.address}
// Date: ${booking.date}`,
//   });
// };