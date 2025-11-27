import React, { useState, useEffect } from 'react';
import {
  Star,
  User,
  ThumbsUp,
  Calendar,
  Filter,
  Search,
  AlertCircle
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api/reviews';

const UserReviews = ({ email }) => {
  const [reviews, setReviews] = useState([]);
  const [newReviewForm, setNewReviewForm] = useState({ rating: 0, comment: '', product: '' });
  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [showFormConfirmation, setShowFormConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
      setIsLoggedIn(true);
    }

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}?email=${email}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (email) fetchReviews();
  }, [email]);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) / reviews.length).toFixed(1)
    : 'N/A';

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) =>
    reviews.filter((r) => Number(r.rating) === rating).length
  );

  const filteredReviews = reviews.filter((review) => {
    const matchesRating = filterRating === 'all' || Number(review.rating) === Number(filterRating);
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch = term === '' ||
      (review.comment && review.comment.toLowerCase().includes(term)) ||
      (review.product && review.product.toLowerCase().includes(term)) ||
      (review.name && review.name.toLowerCase().includes(term));
    return matchesRating && matchesSearch;
  });

  const StarRating = ({ rating, onRatingClick, interactive = false }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => interactive && onRatingClick(star)}
          className={`w-5 h-5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
        />
      ))}
    </div>
  );

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setNewReviewForm((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null);
  };

  const handleFormRatingChange = (newRating) => {
    setNewReviewForm((prev) => ({ ...prev, rating: newRating }));
    setSubmitError(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!isLoggedIn || !authToken) return setSubmitError('You must be logged in to submit a review.');
    if (!newReviewForm.comment || !newReviewForm.product || newReviewForm.rating === 0) {
      return setSubmitError('Please fill in all fields (rating, comment, and product).');
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newReviewForm,
          email: email
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const newReview = await response.json();
      setReviews((prev) => [newReview, ...prev]);
      setNewReviewForm({ rating: 0, comment: '', product: '' });
      setShowFormConfirmation(true);
      setTimeout(() => setShowFormConfirmation(false), 3000);
    } catch (err) {
      console.error('Error submitting review:', err);
      setSubmitError(err.message || 'Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkHelpful = async (reviewId) => {
    if (!isLoggedIn || !authToken) return alert('You must be logged in to mark helpful.');
    try {
      const response = await fetch(`${API_BASE_URL}/${reviewId}/helpful`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
      });
      if (!response.ok) throw new Error('Failed to mark helpful');
      setReviews((prev) =>
        prev.map((r) => (r._id === reviewId ? { ...r, helpful: (r.helpful || 0) + 1 } : r))
      );
    } catch (err) {
      console.error(err);
      alert(`Failed to mark helpful: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-6 py-6 flex flex-wrap lg:flex-nowrap gap-10">
      {/* Sidebar - Ratings */}
      <aside className="w-full lg:w-80 sticky top-0 self-start">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Overall Rating</h2>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-green-700 mb-2">{avgRating}</div>
            <StarRating rating={reviews.length > 0 ? Math.round(parseFloat(avgRating)) : 0} />
            <p className="text-gray-600 mt-2">{reviews.length} reviews</p>
          </div>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating, idx) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 w-6">{rating}</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all"
                    style={{ width: `${(ratingCounts[idx] / (reviews.length || 1)) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{ratingCounts[idx]}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-green-700" />
              <h3 className="font-semibold text-gray-800">Filter by Rating</h3>
            </div>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-4 sticky top-0 z-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reviews by comment, product, or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Scrollable Reviews */}
        <div className="overflow-y-auto max-h-[calc(100vh-12rem)] space-y-6 pr-2">
          {loading && <div className="text-center py-12">Loading reviews...</div>}
          {error && <div className="text-red-600 py-6">{error}</div>}
          {!loading && !error && (
            filteredReviews.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No reviews found.</div>
            ) : (
              filteredReviews.map((review) => (
                <article key={review._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-800">{review.userName || 'Anonymous'}</h3>
                          {review.verified && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={review.createdAt || review.date}>
                            {new Date(review.createdAt || review.date).toLocaleDateString()}
                          </time>
                        </div>
                        <div className="text-sm text-gray-600">
                          Product: <span className="font-medium">{review.product}</span>
                        </div>
                      </div>
                    </div>
                    <StarRating rating={Number(review.rating) || 0} />
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => handleMarkHelpful(review._id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-medium">Helpful ({review.helpful || 0})</span>
                    </button>
                  </div>
                </article>
              ))
            )
          )}
        </div>

        {/* Write Review Box */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Write Your Review</h2>
          {isLoggedIn ? (
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              {submitError && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm">{submitError}</p>
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  value={newReviewForm.product}
                  onChange={handleFormInputChange}
                  placeholder="e.g., Calming Night Tea"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <StarRating
                  rating={newReviewForm.rating}
                  onRatingClick={handleFormRatingChange}
                  interactive
                />
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={newReviewForm.comment}
                  onChange={handleFormInputChange}
                  placeholder="Write your thoughts..."
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          ) : (
            <p className="text-gray-600">Click Login to submit your review.</p>
          )}
        </div>
      </main>

      {showFormConfirmation && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg z-50">
          <p className="font-medium">✓ Review submitted successfully!</p>
        </div>
      )}
    </div>
  );
};

export default UserReviews;
