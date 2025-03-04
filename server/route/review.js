const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/auth');

// Get all reviews (public route)
router.get('/', reviewController.getAllReviews);

// Add a new review (requires authentication)
router.post('/', verifyToken, reviewController.addReview);

// Delete a review (requires authentication)
router.delete('/:reviewId', verifyToken, reviewController.deleteReview);

module.exports = router; 