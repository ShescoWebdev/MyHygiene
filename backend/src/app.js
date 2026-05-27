import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

const app = express();

// Middlewares
app.use(cors());
 // Use the activity routes

// To handle large payloads for media uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/activities", activityRoutes);
// To serve uploaded media files
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.send("MyHygiene API is alive 🚀");
});

export default app;