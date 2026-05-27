import Activity from "../models/Activity.js";

// To fetch recent activities for the admin dashboard
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 }).limit(50);
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch activities", error: error.message });
  }
};

// To mark all activities as read (e.g., when admin clicks "Mark All as Read")
export const markAllAsRead = async (req, res) => {
  try {
    await Activity.updateMany({ isRead: false }, { isRead: true });
    res.status(200).json({ message: "All activities marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update activities", error: error.message });
  }
};

// To help log an activity from anywhere in the backend (e.g., after a user creates a post, or an admin deletes a comment)
export const logActivity = async (user, actionText, profilePic = null, postId = null) => {
  try {
    const initials = user
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    await Activity.create({
      user: user,
      avatar: initials,
      action: actionText,
      profilePic: profilePic,
      postId: postId
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
};

// To create a new activity log entry (e.g., when a user performs an action that we want to track)
export const createActivityLog = async (req, res) => {
  try {
    const { user, action, profilePic, postId } = req.body;
    
    // To call the logActivity helper function to create the activity log entry
    await logActivity(user, action, profilePic, postId); 
    
    res.status(201).json({ message: "Activity successfully logged" });
  } catch (error) {
    res.status(500).json({ message: "Failed to log activity", error: error.message });
  }
};

// To delete a specific activity log entry (e.g., when an admin wants to remove a notification)
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id);
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete activity", error: error.message });
  }
};

// To delete all activity logs (Clear All)
export const deleteAllActivities = async (req, res) => {
  try {
    await Activity.deleteMany({});
    res.status(200).json({ message: "All activities cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear activities", error: error.message });
  }
};