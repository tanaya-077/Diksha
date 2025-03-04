import Review from '../models/Review.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'; // Import mongoose

const reviewController = {
    // Get all reviews
    getAllReviews: async (req, res) => {
        try {
            const reviews = await Review.find()
                .sort({ createdAt: -1 }) // Sort by newest first
                .populate('userId', 'name avatar'); // Get user details
            
            res.json({
                success: true,
                data: reviews
            });
        } catch (error) {
            console.error('Error getting reviews:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching reviews'
            });
        }
    },

    // Add a new review
    addReview: async (req, res) => {
        try {
            console.log('Adding review - Request body:', req.body);
            console.log('User ID from auth middleware:', req.userId);
            
            const { rating, comment } = req.body;
            const userId = req.userId; // Get userId from auth middleware
           
            if (!userId) {
                console.log('Missing user ID in request');
                return res.status(400).json({
                    success: false,
                    message: 'User ID is required'
                });
            }
            
            // Verify userId is in valid format for MongoDB
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                console.log('Invalid user ID format:', userId);
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user ID format'
                });
            }
            
            // Get user details
            console.log('Finding user with ID:', userId);
            const user = await User.findById(userId);
            
            if (!user) {
                console.log('User not found for ID:', userId);
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            
            console.log('User found:', user.name, 'with avatar:', user.avatar);

            // Create new review
            const review = new Review({
                userId,
                name: user.name || 'Anonymous',
                rating,
                comment,
                image: user.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"
            });
            
            console.log('Saving review:', review);
            const savedReview = await review.save();
            console.log('Review saved with ID:', savedReview._id);
            
            // Populate user details in the response
            const populatedReview = await Review.findById(savedReview._id)
                .populate('userId', 'name avatar');
            
            console.log('Populated review:', populatedReview);

            res.json({
                success: true,
                message: 'Review added successfully',
                data: populatedReview
            });
        } catch (error) {
            console.error('Error adding review:', error);
            res.status(500).json({
                success: false,
                message: 'Error adding review',
                error: error.message
            });
        }
    },

    // Delete a review
    deleteReview: async (req, res) => {
        try {
            const { reviewId } = req.params;
            const userId = req.userId; // Get userId from auth middleware

            // Find review and check ownership
            const review = await Review.findById(reviewId);
            
            if (!review) {
                return res.status(404).json({
                    success: false,
                    message: 'Review not found'
                });
            }

            // Check if the user owns this review
            if (review.userId.toString() !== userId.toString()) {
                return res.status(403).json({
                    success: false,
                    message: 'Not authorized to delete this review'
                });
            }

            // Delete the review
            await Review.findByIdAndDelete(reviewId);

            res.json({
                success: true,
                message: 'Review deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting review:', error);
            res.status(500).json({
                success: false,
                message: 'Error deleting review'
            });
        }
    }
};

export default reviewController;