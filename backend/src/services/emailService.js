import nodemailer from "nodemailer";

const sendEmail = async (booking) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email to team
  await transporter.sendMail({
    from: `"MyHygiene" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "🧹 New Booking Received",
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6;">
        <h2 style="color:#f0b000;">MyHygiene Booking</h2>
        <p>A new booking has been received. Details below:</p>

        <hr/>

        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Address:</strong> ${booking.address}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Items:</strong> ${booking.items}</p>
        <p><strong>Instructions:</strong> ${booking.instructions}</p>

        <hr/>
        <p style="color:gray;">This message was sent from MyHygiene system.</p>
      </div>
    `,
  });

  // Email to customer
  await transporter.sendMail({
    from: `"MyHygiene" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: "Booking Confirmation - MyHygiene",
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6;">
        <h2 style="color:#f0b000;">Booking Confirmed</h2>
        <p>Dear ${booking.name},</p>

        <p>Thank you for booking with MyHygiene. We have received your request and will contact you shortly to confirm the final details.</p>

        <br/>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Date:</strong> ${booking.date}</p>

        <br/>
        <p>We look forward to serving you.</p>

        <p><strong>MyHygiene Team</strong></p>
      </div>
    `,
  });
};

export default sendEmail;