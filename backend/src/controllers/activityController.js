import Activity from "../models/Activity.js";

// @desc    Get all activities for the admin timeline
// @route   GET /api/activities
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 }).limit(50);
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch activities", error: error.message });
  }
};

// @desc    Mark all unread activities as read
// @route   PUT /api/activities/mark-read
export const markAllAsRead = async (req, res) => {
  try {
    await Activity.updateMany({ isRead: false }, { isRead: true });
    res.status(200).json({ message: "All activities marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update activities", error: error.message });
  }
};

// HELPER FUNCTION: Call this from ANY other controller to log an event!
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
      profilePic: profilePic, // You can modify this to accept a profile picture URL if available
      postId: postId // To link to a specific post if applicable
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
};

// @desc    Create a new activity log from the frontend
// @route   POST /api/activities
export const createActivityLog = async (req, res) => {
  try {
    const { user, action, profilePic, postId } = req.body;
    
    // We reuse the exact same helper function!
    await logActivity(user, action, profilePic, postId); 
    
    res.status(201).json({ message: "Activity successfully logged" });
  } catch (error) {
    res.status(500).json({ message: "Failed to log activity", error: error.message });
  }
};

// @desc    Delete a single activity log
// @route   DELETE /api/activities/:id
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id); // Assumes your mongoose model is named Activity
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete notification", error: error.message });
  }
};

// @desc    Delete all activity logs (Clear All)
// @route   DELETE /api/activities
export const deleteAllActivities = async (req, res) => {
  try {
    await Activity.deleteMany({});
    res.status(200).json({ message: "All notifications cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear notifications", error: error.message });
  }
};

// // Example helper function inside your backend controller
// export const logActivity = async (user, action, profilePic = null) => {
//   try {
//     await Activity.create({ 
//       user, 
//       action, 
//       profilePic // 👈 Ensure this is passed into the creation object!
//     });
//   } catch (error) {
//     console.error("Error logging activity:", error);
//   }
// };