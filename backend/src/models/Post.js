import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: "",
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
    // Array of users who liked the post
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    isFeatured: { 
      type: Boolean, 
      default: false 
    },
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model("Post", postSchema);