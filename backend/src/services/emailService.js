import nodemailer from "nodemailer";

const sendEmail = async (booking, isUpdate = false) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    family: 4,    
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const d = new Date(booking.date);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const formattedDate = booking.date 
    ? `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    : "Not specified";

  const timeStr = booking.time || "Not specified";
  
  // This pulls your frontend URL from the .env file (e.g., http://localhost:5173)
  const clientURL = process.env.FRONTEND_URL || "http://localhost:5173"; 

  // --- DETERMINE CUSTOMER EMAIL CONTENT ---
  let subject = "We've received your booking request! - MyHygiene";
  let messageBody = `<p>Hello ${booking.name}, we've successfully received your cleaning request! Our administrative team is currently reviewing your details. Hang tight— please do not resubmit your request. We will notify you as soon as your booking is confirmed. Thank you as you await our response!</p>`;

  if (isUpdate) {
    if (booking.status === "Confirmed") {
      subject = "Your MyHygiene Booking is CONFIRMED!";
      messageBody = `<p>Great news, ${booking.name}! Your MyHygiene booking for <strong>${booking.service}</strong> has been officially confirmed for <strong>${formattedDate}</strong>.</p>
                     <p>Our team is scheduled and ready to make your space shine. Please keep your phone nearby, as we may try to call or email you if we need any additional details before our arrival. Thank you for choosing MyHygiene!</p>`;
    } else if (booking.status === "Completed") {
      subject = "Service Completed - Thank You from MyHygiene!";
      messageBody = `<p>Hello ${booking.name}, thank you for choosing MyHygiene! Your cleaning session is now complete, and we hope we served you well.</p>
                     <p>We'd love to hear about your experience. Please consider leaving us a quick review to let us know how we did!</p>
                     <p><a href="${clientURL}/leave-review" style="display:inline-block; padding:10px 20px; background-color:#f0b000; color:#000; text-decoration:none; font-weight:bold; border-radius:5px; margin-top:10px;">Leave a Review</a></p>`;
    } else {
      return; 
    }
  }

  // Email to customer
  await transporter.sendMail({
    from: `"MyHygiene" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color: #333;">
        <h2 style="color:#f0b000;">${subject}</h2>
        ${messageBody}
        <br/>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
          <p style="margin: 0 0 10px 0;"><strong>Service:</strong> ${booking.service}</p>
          <p style="margin: 0 0 10px 0;"><strong>Date:</strong> ${formattedDate}</p>
          <p style="margin: 0 0 10px 0;"><strong>Time:</strong> ${timeStr}</p>
          <p style="margin: 0;"><strong>Status:</strong> <span style="color: #0056b3; font-weight:bold;">${booking.status}</span></p>
        </div>
        <br/>
        <p><strong>The MyHygiene Team</strong></p>
      </div>
    `,
  });

  // --- TEAM NOTIFICATION (Only on NEW bookings) ---
  if (!isUpdate) {
    await transporter.sendMail({
      from: `"MyHygiene" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sends to your admin email
      subject: "🧹 Action Required: New Booking Received",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
          <h2 style="color:#f0b000;">New MyHygiene Booking</h2>
          <p>A new booking has been received and is waiting for your approval.</p>
          
          <p><a href="${clientURL}/admin" style="display:inline-block; padding:12px 24px; background-color:#0056b3; color:#fff; text-decoration:none; font-weight:bold; border-radius:5px; margin-bottom:15px;">Go to Admin Dashboard to Confirm</a></p>
          
          <hr/>
          <p><strong>Name:</strong> ${booking.name}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Address:</strong> ${booking.address}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${timeStr}</p>
          <p><strong>Service:</strong> ${booking.service}</p>
          <hr/>
        </div>
      `,
    });
  }
};

export default sendEmail;