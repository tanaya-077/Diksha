import express from 'express';
import reviewController from '../controllers/reviewController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all reviews (public route)
router.get('/', reviewController.getAllReviews);

// Add a new review (requires authentication)
router.post('/', auth, reviewController.addReview);

// Delete a review (requires authentication)
router.delete('/:reviewId', auth, reviewController.deleteReview);

export default router;