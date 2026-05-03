import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: "", // Now optional! You can have text-only posts
    },
    mediaType: {
      type: String,
      enum: ["photo", "video", "text"],
      default: "text", 
    },
    caption: {
      type: String,
      trim: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // NEW: Array of User IDs who liked the post (Heart reaction)
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model("Post", postSchema);