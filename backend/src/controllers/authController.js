import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary (Make sure these are in your .env file!)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Register
export const registerUser = async (req, res) => {
  const { name, email, password, phone, address } = req.body; 

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // save to MongoDB
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    profilePic: user.profilePic, // Added this
    token: generateToken(user._id),
  });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      profilePic: user.profilePic, // Added this
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// NEW: Upload Profile Picture
export const updateProfilePic = async (req, res) => {
  try {
    // req.user.id comes from the 'protect' middleware
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image file" });
    }

    // Convert the file buffer to a Base64 string for Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "myhygiene_avatars", // Creates a neat folder in your Cloudinary
      width: 300,
      crop: "scale"
    });

    // Save the Cloudinary URL to the user in the database
    user.profilePic = result.secure_url;
    await user.save();

    // Send back the updated user details
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      profilePic: user.profilePic,
      token: req.headers.authorization.split(" ")[1], // keep their current token
    });
    
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ message: "Server error during image upload" });
  }
};

export const protect = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    // Note: I changed decoded to get req.user.id because we need the ID to find the user in DB
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Usually generateToken signs the id as { id: user._id }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};