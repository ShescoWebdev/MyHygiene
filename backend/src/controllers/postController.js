import Post from "../models/Post.js";

// @desc    Create a new post (Media + Text, or Text only)
// @route   POST /api/posts/upload
// @access  Private/Admin
export const createPost = async (req, res) => {
  try {
    const captionText = req.body.caption || ""; 
    
    // Determine if there is a file attached
    let fileUrl = "";
    let fileType = "text";

    if (req.file) {
      fileUrl = req.file.path;
      fileType = req.file.mimetype.includes("video") ? "video" : "photo";
    }

    // Ensure at least a caption or a file is provided
    if (!fileUrl && !captionText) {
      return res.status(400).json({ message: "Please provide a photo, video, or caption." });
    }

    const newPost = await Post.create({
      url: fileUrl,
      mediaType: fileType,
      caption: captionText,
      uploadedBy: req.user._id, 
    });

    res.status(201).json({
      message: "Post created successfully!",
      post: newPost
    });

  } catch (error) {
    console.error("Post Creation Error:", error);
    res.status(500).json({ message: "Failed to create post." });
  }
};

// @desc    Get all posts (for Feed and Gallery) with Pagination
// @route   GET /api/posts?page=1&limit=10
// @access  Public
export const getAllPosts = async (req, res) => {
  try {
    // Implement "See More" backend pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit)
      .populate("uploadedBy", "name profilePic");

    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      posts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts." });
  }
};

// @desc    Like / Unlike a post (TikTok Heart)
// @route   PUT /api/posts/:id/like
// @access  Private (Logged in users)
export const toggleLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user already liked the post
    const alreadyLiked = post.likes.includes(req.user._id);

    if (alreadyLiked) {
      // Remove the like (Unlike)
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      // Add the like (Heart)
      post.likes.push(req.user._id);
    }

    await post.save();
    
    // We send back the updated likes array so the frontend can update instantly
    res.status(200).json({ likes: post.likes });
  } catch (error) {
    console.error("Like Error:", error);
    res.status(500).json({ message: "Failed to like post." });
  }
};