import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsApp = async (booking, isUpdate = false) => {
  // To format the date in a more readable way
  const d = new Date(booking.date);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const formattedDate = booking.date 
    ? `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    : "Not specified";

  const timeStr = booking.time || "Not specified";
  const clientURL = process.env.FRONTEND_URL || "https://myhygiene.netlify.app";

  let message = "";

  if (!isUpdate) {
    // To send WhatsApp message to team for new bookings
    message = 
`🧹 *Action Required: New Booking Received*

A new booking has been received and is waiting for your approval.

🔗 *Admin Dashboard:* ${clientURL}/admin

---
*Customer Details:*
👤 *Name:* ${booking.name}
📞 *Phone:* ${booking.phone}
📧 *Email:* ${booking.email}
📍 *Address:* ${booking.address}

*Service Details:*
🧼 *Service:* ${booking.service}
🧺 *Items/Areas:* ${booking.items || "None specified"}
📅 *Date:* ${formattedDate}
⏰ *Time:* ${timeStr}

*Additional Info:*
📝 *Instructions:* ${booking.instructions || "No special instructions provided."}
---`;
  } 
  else if (isUpdate) {
    if (booking.status === "Confirmed") {
  
  // To send WhatsApp message to team for confirmed bookings    
      message = 
`✅ *Update: Booking CONFIRMED*

The booking for *${booking.name}* has been officially confirmed.

*Service:* ${booking.service}
*Items:* ${booking.items || "N/A"}
*Date:* ${formattedDate}
*Time:* ${timeStr}
*Address:* ${booking.address}`;
    } 
    else if (booking.status === "Completed") {

  // To send WhatsApp message to team for completed bookings
      message = 
`🎉 *Service Completed*

The cleaning session for *${booking.name}* is now complete. 

*Review Link:* ${clientURL}/leave-review`;
    } 
    else {
      return; 
    }
  }

  try {
    await client.messages.create({
      from: "whatsapp:+14155238886", 
      to: "whatsapp:+2348145364748", 
      body: message,
    });
    console.log("✅ WhatsApp Notification Sent with Full Details");
  } catch (error) {
    console.error("🚨 WhatsApp Failed:", error.message);
  }
};




// import twilio from "twilio";

// const client = twilio(
//   process.env.TWILIO_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// export const sendWhatsApp = async (booking, isUpdate = false) => {
//   // To format the date in a more readable way
//   const d = new Date(booking.date);
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];
  
//   const formattedDate = booking.date 
//     ? `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
//     : "Not specified";

//   const timeStr = booking.time || "Not specified";

//   let message = "";
  
//   if (!isUpdate) {
//     // To send WhatsApp message to team for new bookings
//     message = `🧹 New Booking Received. Details below:\nName: ${booking.name}\nService: ${booking.service}\nAddress: ${booking.address}\nDate: ${formattedDate}\nTime: ${timeStr}`;
//   } else if (booking.status === "Confirmed") {
//     // Optional: Let the team know it was confirmed
//     message = `✅ Update: Booking CONFIRMED for ${booking.name}.\nService: ${booking.service}\nDate: ${formattedDate}`;
//   } else {
//     // Don't send WhatsApp messages for other status changes
//     return;
//   }

//   await client.messages.create({
//     from: "whatsapp:+14155238886", // Twilio sandbox
//     to: "whatsapp:+2348145364748", // team number
//     body: message,
//   });
// };