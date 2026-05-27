import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: { 
        type: String, 
        required: true 
    }, // e.g., "John Doe"
    avatar: { 
        type: String 
    }, // e.g., "JD" (initials for avatar)
    action: { 
        type: String, 
        required: true 
    }, // e.g., "booked a Deep Clean"
    profilePic: { 
        type: String, 
        default: null 
    }, // URL to the user's profile picture
    postId: { 
        type: String, 
        default: null 
    }, // To link to a specific post if applicable
    isRead: { 
        type: Boolean, 
        default: false 
    } // To track if the admin has read this activity
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;