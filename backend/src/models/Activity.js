import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: { 
        type: String, 
        required: true 
    },
    avatar: { 
        type: String 
    },
    action: { 
        type: String, 
        required: true 
    },
    profilePic: { 
        type: String, 
        default: null 
    },
    postId: { 
        type: String, 
        default: null 
    },
    isRead: { 
        type: Boolean, 
        default: false 
    }
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;