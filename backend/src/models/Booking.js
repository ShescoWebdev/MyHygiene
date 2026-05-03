import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name:{ 
        type: String, 
        required: true 
    },
    phone:{ 
        type: String, 
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
        type: String
     },
    address: { 
        type: String, 
        required: true 
    },
    status: {
      type: String,
    enum: ["Pending", "Confirmed", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);