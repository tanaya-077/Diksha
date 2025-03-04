import React, { useState, useEffect } from 'react';
import { FaStar, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import { useNavigate } from 'react-router-dom';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [hoveredRating, setHoveredRating] = useState(null);
  const navigate = useNavigate();

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      console.log('Fetching reviews from /api/reviews...');
      const response = await Axios.get('/api/reviews');
      console.log('Reviews response:', response.data);

      if (response.data.success) {
        setReviews(response.data.data);
      } else {
        console.error('Failed to fetch reviews:', response.data.message);
        toast.error(response.data.message || 'Failed to load reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error(error.response?.data?.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAddReview = async (e) => {
    e.preventDefault();
    
    if (!user._id) {
      toast.error("Please login to add a review");
      navigate('/login');
      return;
    }

    // Check if access token exists
    const accessToken = localStorage.getItem('accesstoken');
    if (!accessToken) {
      toast.error("Your session has expired. Please login again.");
      navigate('/login');
      return;
    }

    if (!newReview.comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    try {
      console.log('Adding review with data:', {
        rating: newReview.rating,
        comment: newReview.comment.trim()
      });
      console.log('User ID:', user._id);
      console.log('Access token available:', !!accessToken);

      const response = await Axios.post('/api/reviews', {
        rating: newReview.rating,
        comment: newReview.comment.trim()
      });

      console.log('Add review response:', response.data);

      if (response.data.success) {
        // Add the new review to the list
        const newReviewData = response.data.data;
        setReviews(prevReviews => [newReviewData, ...prevReviews]);
        
        // Reset form
        setNewReview({ rating: 5, comment: '' });
        setShowForm(false);
        toast.success("Review added successfully!");
      } else {
        console.error('Failed to add review:', response.data.message);
        toast.error(response.data.message || 'Failed to add review');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      if (error.response?.status === 401) {
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('refreshToken');
        toast.error('Your session has expired. Please login again.');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || error.message || 'Failed to add review. Please try again.');
      }
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!user._id) {
      toast.error("Please login to delete a review");
      navigate('/login');
      return;
    }

    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        console.log(`Deleting review with ID: ${reviewId}`);
        const response = await Axios.delete(`/api/reviews/${reviewId}`, { 
          withCredentials: true 
        });

        console.log('Delete review response:', response.data);

        if (response.data.success) {
          setReviews(reviews.filter(review => review._id !== reviewId));
          toast.success("Review deleted successfully!");
        } else {
          console.error('Failed to delete review:', response.data.message);
          toast.error(response.data.message || "Failed to delete review");
        }
      } catch (error) {
        console.error('Error deleting review:', error);
        if (error.response?.status === 401) {
          toast.error('Please login to delete a review');
          navigate('/login');
        } else if (error.response?.status === 403) {
          toast.error('You can only delete your own reviews');
        } else {
          toast.error(error.response?.data?.message || 'Failed to delete review');
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Loading Reviews...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Don't just take our word for it - hear from our satisfied customers
          </p>
          {user._id ? (
            <button
              onClick={() => setShowForm(!showForm)}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {showForm ? 'Cancel' : 'Add Your Review'}
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Login to Add Review
            </button>
          )}
        </div>

        {/* Add Review Form */}
        {showForm && user._id && (
          <div className="mt-8 max-w-2xl mx-auto">
            <form onSubmit={handleAddReview} className="bg-white shadow-lg rounded-lg p-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className="focus:outline-none"
                      onMouseEnter={() => setHoveredRating(rating)}
                      onMouseLeave={() => setHoveredRating(null)}
                      onClick={() => setNewReview({ ...newReview, rating })}
                    >
                      <FaStar
                        className={`text-2xl ${
                          (hoveredRating || newReview.rating) >= rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                  placeholder="Write your review here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-3 sm:gap-12">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 relative"
              >
                {/* Delete button - only shown if the review belongs to the current user */}
                {user._id && review.userId && (user._id === review.userId._id || user._id === review.userId) && (
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                    title="Delete review"
                  >
                    <FaTrash />
                  </button>
                )}
                
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={review.image}
                    alt={review.name}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{review.name}</h3>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, index) => (
                        <FaStar key={index} className="text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{review.comment}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-lg text-gray-500">No reviews yet. Be the first to leave a review!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;