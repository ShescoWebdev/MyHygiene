import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import postRoutes from "./routes/bookingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/uploads", postRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/uploads", express.static("uploads")); // Serve uploaded media files

// Test route
app.get("/", (req, res) => {
  res.send("MyHygiene API is alive 🚀");
});

export default app

// import express from "express";
// import cors from "cors";
// import authRoutes from "./routes/authRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import postRoutes from "./routes/postRoutes.js"; // 👉 1. Import your post routes

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/posts", postRoutes); // 👉 2. Mount the routes so Express knows about them!

// app.use("/uploads", express.static("uploads")); // Serve uploaded media files

// // Test route
// app.get("/", (req, res) => {
//   res.send("MyHygiene API is alive 🚀");
// });

// export default app;