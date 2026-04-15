      // THIRD
      import nodemailer from "nodemailer";

const sendEmail = async (booking) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use SSL
    family: 4,    // Forces IPv4 instead of IPv6
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

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
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${timeStr}</p>
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
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${timeStr}</p>

        <br/>
        <p>We look forward to serving you.</p>

        <p><strong>MyHygiene Team</strong></p>
      </div>
    `,
  });
};

export default sendEmail;












            // SECOND
// import nodemailer from "nodemailer";

// const sendEmail = async (booking) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // Use SSL
//     family: 4,    // Forces IPv4 instead of IPv6
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

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

//   // Email to team
//   await transporter.sendMail({
//     from: `"MyHygiene" <${process.env.EMAIL_USER}>`,
//     to: process.env.EMAIL_USER,
//     subject: "🧹 New Booking Received",
//     html: `
//       <div style="font-family: Arial, sans-serif; line-height:1.6;">
//         <h2 style="color:#f0b000;">MyHygiene Booking</h2>
//         <p>A new booking has been received. Details below:</p>

//         <hr/>

//         <p><strong>Name:</strong> ${booking.name}</p>
//         <p><strong>Phone:</strong> ${booking.phone}</p>
//         <p><strong>Email:</strong> ${booking.email}</p>
//         <p><strong>Service:</strong> ${booking.service}</p>
//         <p><strong>Address:</strong> ${booking.address}</p>
//         <p><strong>Date:</strong> ${formattedDate}</p>
//         <p><strong>Time:</strong> ${formattedTime}</p>
//         <p><strong>Items:</strong> ${booking.items}</p>
//         <p><strong>Instructions:</strong> ${booking.instructions}</p>

//         <hr/>
//         <p style="color:gray;">This message was sent from MyHygiene system.</p>
//       </div>
//     `,
//   });

//   // Email to customer
//   await transporter.sendMail({
//     from: `"MyHygiene" <${process.env.EMAIL_USER}>`,
//     to: booking.email,
//     subject: "Booking Confirmation - MyHygiene",
//     html: `
//       <div style="font-family: Arial, sans-serif; line-height:1.6;">
//         <h2 style="color:#f0b000;">Booking Confirmed</h2>
//         <p>Dear ${booking.name},</p>

//         <p>Thank you for booking with MyHygiene. We have received your request and will contact you shortly to confirm the final details.</p>

//         <br/>
//         <p><strong>Service:</strong> ${booking.service}</p>
//         <p><strong>Date:</strong> ${formattedDate}</p>
//         <p><strong>Time:</strong> ${formattedTime}</p>

//         <br/>
//         <p>We look forward to serving you.</p>

//         <p><strong>MyHygiene Team</strong></p>
//       </div>
//     `,
//   });
// };

// export default sendEmail;





        // FIRST
// import nodemailer from "nodemailer";

// const sendEmail = async (booking) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // Use SSL
//     family: 4,    // Forces IPv4 instead of IPv6
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   // Email to team
//   await transporter.sendMail({
//     from: `"MyHygiene" <${process.env.EMAIL_USER}>`,
//     to: process.env.EMAIL_USER,
//     subject: "🧹 New Booking Received",
//     html: `
//       <div style="font-family: Arial, sans-serif; line-height:1.6;">
//         <h2 style="color:#f0b000;">MyHygiene Booking</h2>
//         <p>A new booking has been received. Details below:</p>

//         <hr/>

//         <p><strong>Name:</strong> ${booking.name}</p>
//         <p><strong>Phone:</strong> ${booking.phone}</p>
//         <p><strong>Email:</strong> ${booking.email}</p>
//         <p><strong>Service:</strong> ${booking.service}</p>
//         <p><strong>Address:</strong> ${booking.address}</p>
//         <p><strong>Date:</strong> ${booking.date}</p>
//         <p><strong>Items:</strong> ${booking.items}</p>
//         <p><strong>Instructions:</strong> ${booking.instructions}</p>

//         <hr/>
//         <p style="color:gray;">This message was sent from MyHygiene system.</p>
//       </div>
//     `,
//   });

//   // Email to customer
//   await transporter.sendMail({
//     from: `"MyHygiene" <${process.env.EMAIL_USER}>`,
//     to: booking.email,
//     subject: "Booking Confirmation - MyHygiene",
//     html: `
//       <div style="font-family: Arial, sans-serif; line-height:1.6;">
//         <h2 style="color:#f0b000;">Booking Confirmed</h2>
//         <p>Dear ${booking.name},</p>

//         <p>Thank you for booking with MyHygiene. We have received your request and will contact you shortly to confirm the final details.</p>

//         <br/>
//         <p><strong>Service:</strong> ${booking.service}</p>
//         <p><strong>Date:</strong> ${booking.date}</p>

//         <br/>
//         <p>We look forward to serving you.</p>

//         <p><strong>MyHygiene Team</strong></p>
//       </div>
//     `,
//   });
// };

// export default sendEmail;