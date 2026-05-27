import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// To register user
export const registerUser = async (req, res) => {
  const { name, email, password, phone, address } = req.body; 

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Save to mongoDB
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
    profilePic: user.profilePic,
    token: generateToken(user._id),
    role: user.role,
  });
};

// To login user
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
      profilePic: user.profilePic,
      token: generateToken(user._id),
      role: user.role || "user",
    });
  } else {
    res.status(401).json({ message: "User Account Does Not Exist" });
  }
};
// To upload profile picture
export const updateProfilePic = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image file" });
    }

    // To convert the file buffer to a base64 string for cloudinary
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      // creates a folder in cloudinary
      folder: "myhygiene_avatars",
      width: 300,
      crop: "scale"
    });

    // To save the cloudinary URL to the user in the database
    user.profilePic = result.secure_url;
    await user.save();

    // To send back the updated user details
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      profilePic: user.profilePic,
      token: req.headers.authorization.split(" ")[1],
      role: user.role,
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
    // To find the user in database 
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};