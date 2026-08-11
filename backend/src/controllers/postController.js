import Post from "../models/Post.js";
import { cloudinary } from "../middleware/uploadMiddleware.js";

// To extract the public_id from a Cloudinary URL for deletion
const extractCloudinaryPublicId = (url) => {
  if (!url || !url.includes("res.cloudinary.com")) return null;

  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return null;

  let pathAfterUpload = url.substring(uploadIndex + "/upload/".length);

  // To strip an optional version segment
  pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, "");

  // To strip the file extension, leaving the bare public_id
  const lastDotIndex = pathAfterUpload.lastIndexOf(".");
  return lastDotIndex !== -1 ? pathAfterUpload.substring(0, lastDotIndex) : pathAfterUpload;
};

// To remove a single file from Cloudinary storage
const deleteFileFromCloudinary = async (fileEntry) => {
  if (!fileEntry?.url) return;

  const publicId = extractCloudinaryPublicId(fileEntry.url);
  if (!publicId) return;

  const resourceType = fileEntry.mediaType === "video" ? "video" : "image";

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    console.error(`Cloudinary deletion failed for ${publicId}:`, error);
  }
};

// To remove every file attached to a post from Cloudinary storage
const deleteFromCloudinary = async (post) => {
  if (!post?.files || post.files.length === 0) return; // Text-only post
  await Promise.all(post.files.map((fileEntry) => deleteFileFromCloudinary(fileEntry)));
};

// To turn the raw multer files into the shape stored on the post
const mapUploadedFiles = (uploadedFiles = []) => {
  return uploadedFiles.map((file) => ({
    url: file.path.replace(/\\/g, "/"),
    mediaType: file.mimetype.includes("video") ? "video" : "photo",
  }));
};

// To derive the overall post mediaType from its attached files
const deriveMediaType = (files) => {
  if (!files || files.length === 0) return "text";
  return files.some((f) => f.mediaType === "video") ? "video" : "photo";
};

// To parse the existingFiles JSON string sent from the client during an edit
const parseExistingFiles = (raw) => {
  if (raw === undefined) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse existingFiles:", error);
    return [];
  }
};

// To create a post
export const createPost = async (req, res) => {
  try {
    const captionText = req.body.caption || ""; 

    // To handle both single and multiple file uploads
    const incomingFiles = req.files && req.files.length > 0 ? req.files : (req.file ? [req.file] : []);
    const mappedFiles = mapUploadedFiles(incomingFiles);

    // To ensure a caption or at least one file is provided
    if (mappedFiles.length === 0 && !captionText) {
      return res.status(400).json({ message: "Please provide a photo, video, or caption." });
    }

    const newPost = await Post.create({
      files: mappedFiles,
      mediaType: deriveMediaType(mappedFiles),
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

    // To update caption if provided
    if (req.body.caption !== undefined) {
      post.caption = req.body.caption;
    }

    // To handle file updates, additions and deletions
    const previousFiles = post.files;

    const incomingFiles = req.files && req.files.length > 0 ? req.files : (req.file ? [req.file] : []);
    const mappedNewFiles = mapUploadedFiles(incomingFiles);

    // To know which files to keep, if the frontend sent that information
    const existingFilesFromClient = parseExistingFiles(req.body.existingFiles);

    let filesToDelete = [];
    let finalFiles;

    // To determine which files to keep, delete, or add
    if (existingFilesFromClient !== null) {
      const keptUrls = new Set(existingFilesFromClient.map((f) => f.url));
      filesToDelete = previousFiles.filter((f) => !keptUrls.has(f.url));
      const keptFiles = previousFiles.filter((f) => keptUrls.has(f.url));
      finalFiles = [...keptFiles, ...mappedNewFiles];
    } else if (incomingFiles.length > 0) {
      filesToDelete = previousFiles;
      finalFiles = mappedNewFiles;
    } else {
      finalFiles = previousFiles;
    }

    post.files = finalFiles;
    post.mediaType = deriveMediaType(finalFiles);

    const updatedPost = await post.save();

    // To delete files from Cloudinary that are no longer associated with the post
    if (filesToDelete.length > 0) {
      await Promise.all(filesToDelete.map((fileEntry) => deleteFileFromCloudinary(fileEntry)));
    }

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

    // To delete the post from the database
    await post.deleteOne(); 

    // To remove the associated photo/video from Cloudinary so it stops taking up storage space
    await deleteFromCloudinary(post);

    res.status(200).json({ message: "Post deleted successfully!" });

  } catch (error) {
    console.error("Post Deletion Error:", error);
    res.status(500).json({ message: "Failed to delete post." });
  }
};

// To delete multiple posts at once
export const deleteMultiplePosts = async (req, res) => {
  try {
    const { postIds } = req.body;

    if (!postIds || postIds.length === 0) {
      return res.status(400).json({ message: "No posts selected for deletion." });
    }

    // To fetch the full post records for the provided IDs to ensure they exist and to get their associated files
    const posts = await Post.find({ _id: { $in: postIds } });

    // To delete all IDs provided in the array
    await Post.deleteMany({ _id: { $in: postIds } });

    // To remove each associated file from Cloudinary, freeing up storage space
    await Promise.all(posts.map((post) => deleteFromCloudinary(post)));

    res.status(200).json({ message: "Selected posts deleted successfully!" });
  } catch (error) {
    console.error("Bulk Deletion Error:", error);
    res.status(500).json({ message: "Failed to delete selected posts." });
  }
};