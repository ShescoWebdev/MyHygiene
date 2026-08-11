import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["photo", "video"],
      required: true,
    },
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    files: {
      type: [fileSchema],
      default: [],
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