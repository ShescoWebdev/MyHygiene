import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name:{ 
        type: String, 
        required: true 
    },
    phone:{ type: String, 
        required: true 
    },
    email:{ 
        type: String, 
        required: true 
    },
    instructions:{ 
        type: String 
    },
    items:{ 
        type: String 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    service: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    time: { 
        type: String,
        required: true
     },
    address: { 
        type: String, 
        required: true 
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);