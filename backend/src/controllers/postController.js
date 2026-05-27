import Post from "../models/Post.js";

// To create a post
export const createPost = async (req, res) => {
  try {
    const captionText = req.body.caption || ""; 
    
    // To determine if there is a file attached
    let fileUrl = "";
    let fileType = "text";

    if (req.file) {
      fileUrl = req.file.path.replace(/\\/g, "/"); 
      fileType = req.file.mimetype.includes("video") ? "video" : "photo";
    }

    // To ensure a caption or a file is provided
    if (!fileUrl && !captionText) {
      return res.status(400).json({ message: "Please provide a photo, video, or caption." });
    }

    const newPost = await Post.create({
      url: fileUrl,
      mediaType: fileType,
      caption: captionText,
      uploadedBy: req.user._id, 
    });

    // To populate the newly created post with the author's details before sending it back
    const populatedPost = await Post.findById(newPost._id).populate("uploadedBy", "name profilePic");

    res.status(201).json({
      message: "Post created successfully!",
      post: populatedPost
    });

  } catch (error) {
    console.error("Post Creation Error:", error);
    res.status(500).json({ message: "Failed to create post." });
  }
};

// To get all posts with Pagination
export const getAllPosts = async (req, res) => {
  try {
    // To implement "See More" backend pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
    // Newest first
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit)
      .populate("uploadedBy", "name profilePic")
      .populate("likes", "name profilePic");

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

// To like / unlike a post
export const toggleLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // To check if user already liked the post
    const alreadyLiked = post.likes.includes(req.user._id);

    if (alreadyLiked) {
      // To Unlike
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      // To like
      post.likes.push(req.user._id);
    }

    await post.save();

    await post.populate("likes", "name profilePic");
    
    // To send back the updated likes and frontend update instantly
    res.status(200).json({ likes: post.likes });
  } catch (error) {
    console.error("Like Error:", error);
    res.status(500).json({ message: "Failed to like post." });
  }
};

// To edit and update a post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // To ensure that the user requesting the edit owns the post
    if (post.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this post." });
    }

    // Update caption if provided
    if (req.body.caption !== undefined) {
      post.caption = req.body.caption;
    }

    // If a new file is uploaded, update the url and mediaType
    if (req.file) {
      post.url = req.file.path.replace(/\\/g, "/");
      post.mediaType = req.file.mimetype.includes("video") ? "video" : "photo";
    }

    const updatedPost = await post.save();

    // To populate the updated post before sending it back
    await updatedPost.populate("uploadedBy", "name profilePic");

    res.status(200).json({
      message: "Post updated successfully!",
      post: updatedPost
    });

  } catch (error) {
    console.error("Post Update Error:", error);
    res.status(500).json({ message: "Failed to update post." });
  }
};

// To delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // To ensure the user requesting the deletion owns the post
    if (post.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this post." });
    }

    // Delete the post from the database
    await post.deleteOne(); 

    // To delete the image/video file from server 
    // storage (e.g., using 'fs.unlinkSync'), we do that here before returning the response.

    res.status(200).json({ message: "Post deleted successfully!" });

  } catch (error) {
    console.error("Post Deletion Error:", error);
    res.status(500).json({ message: "Failed to delete post." });
  }
};

// To delete multiple posts at once
export const deleteMultiplePosts = async (req, res) => {
  try {
    const { postIds } = req.body; // Expecting an array of post IDs

    if (!postIds || postIds.length === 0) {
      return res.status(400).json({ message: "No posts selected for deletion." });
    }

    // To delete all IDs provided in the array
    await Post.deleteMany({ _id: { $in: postIds } });

    res.status(200).json({ message: "Selected posts deleted successfully!" });
  } catch (error) {
    console.error("Bulk Deletion Error:", error);
    res.status(500).json({ message: "Failed to delete selected posts." });
  }
};