import Review from "../models/Review.js";

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const review = await Review.create({
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
    });

    res.status(201).json({ message: "Review submitted successfully!", review });
  } catch (error) {
    console.error("ERROR CREATING REVIEW:", error.message);
    res.status(500).json({ message: "Failed to submit review." });
  }
};

// Get all approved reviews (for homepage carousel)
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews." });
  }
};