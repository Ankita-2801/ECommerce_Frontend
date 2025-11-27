import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Trash2, Eye } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import Modal from '../ReuseNav/Modal';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

// Star rating helper
const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center text-yellow-400">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} size={20} fill="currentColor" stroke="currentColor" />
            ))}
            {hasHalfStar && <Star key="half" size={20} fill="currentColor" stroke="currentColor" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} size={20} stroke="currentColor" className="text-gray-300" />
            ))}
        </div>
    );
};

const CHARACTER_LIMIT = 150;

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    // Fetch reviews from backend
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`${API_BASE}/reviews`);
                const data = await res.json();
                setReviews(data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                toast.error('Failed to fetch reviews');
                setIsLoading(false);
            }
        };
        fetchReviews();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="flex flex-col items-center space-y-4 text-white">
                    <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-lg font-medium">Loading your Reviews...</span>
                </div>
            </div>
        );
    }

    // DELETE review
    const handleDeleteReview = async (id) => {
        try {
            await fetch(`${API_BASE}/reviews/${id}`, { method: 'DELETE' });
            setReviews(reviews.filter(r => r._id !== id));
            toast.success('Review deleted');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete review');
        }
    };

    // APPROVE review
    const handleApproveReview = async (id) => {
        try {
            const res = await fetch(`${API_BASE}/reviews/${id}/approve`, { method: 'PUT' });
            const updated = await res.json();
            setReviews(reviews.map(r => r._id === id ? updated.review : r));
            toast.success('Review approved');
        } catch (err) {
            console.error(err);
            toast.error('Failed to approve review');
        }
    };

    // MARK helpful
    const handleMarkHelpful = async (id) => {
        try {
            const res = await fetch(`${API_BASE}/reviews/${id}/helpful`, { method: 'PUT' });
            const updated = await res.json();
            setReviews(reviews.map(r => r._id === id ? updated : r));
            toast.success('Marked as helpful');
        } catch (err) {
            console.error(err);
            toast.error('Failed to mark helpful');
        }
    };

    const handleViewDetails = (review) => {
        setSelectedReview(review);
        setIsDetailsModalOpen(true);
    };

    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedReview(null);
    };

    return (
        <div className="space-y-6 p-8 backdrop-blur-sm rounded-xl min-h-screen text-white">
            <h1 className="text-3xl font-bold text-white">Customer Reviews</h1>

            {reviews.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-xl">No reviews found.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review) => (
                        <div key={review._id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500 transition-transform duration-200 hover:scale-[1.01]">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex flex-col">
                                    <p className="text-gray-800 font-semibold text-lg">{review.userName}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Reviewed <span className="font-medium text-gray-600">{review.product}</span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        on {new Date(review.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    {!review.verified && (
                                        <button
                                            onClick={() => handleApproveReview(review._id)}
                                            className="p-2 rounded-full text-green-500 hover:text-green-600 hover:bg-green-100 transition-colors duration-200"
                                            title="Approve Review"
                                        >
                                            <CheckCircle size={20} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteReview(review._id)}
                                        className="p-2 rounded-full text-red-500 hover:text-red-600 hover:bg-red-100 transition-colors duration-200"
                                        title="Delete Review"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleMarkHelpful(review._id)}
                                        className="p-2 rounded-full text-blue-500 hover:text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                                        title="Mark Helpful"
                                    >
                                        👍
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <StarRating rating={review.rating} />
                            </div>
                            <p className="text-gray-700 leading-relaxed italic">
                                "{review.comment.length > CHARACTER_LIMIT ? `${review.comment.substring(0, CHARACTER_LIMIT)}...` : review.comment}"
                            </p>
                            {review.comment.length > CHARACTER_LIMIT && (
                                <button
                                    onClick={() => handleViewDetails(review)}
                                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2 transition-colors duration-200 flex items-center space-x-1"
                                >
                                    <Eye size={16} /> <span>View Details</span>
                                </button>
                            )}
                            {review.verified && (
                                <p className="mt-4 text-sm font-medium text-green-600 flex items-center space-x-1">
                                    <CheckCircle size={16} /> <span>Approved</span>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <ToastContainer position="bottom-right" theme="dark" />

            {/* Modal for full review */}
            <Modal isOpen={isDetailsModalOpen} onClose={handleCloseDetailsModal}>
                {selectedReview && (
                    <div className="p-2 text-left">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Details</h3>
                        <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-gray-100">
                            <p className="text-lg"><span className="font-semibold text-gray-700">User:</span> <span className="text-gray-800 ml-1">{selectedReview.userName}</span></p>
                            <p className="text-lg"><span className="font-semibold text-gray-700">Product:</span> <span className="text-gray-800 ml-1">{selectedReview.product}</span></p>
                            <div className="flex items-center space-x-2 text-lg">
                                <span className="font-semibold text-gray-700">Rating:</span>
                                <StarRating rating={selectedReview.rating} />
                            </div>
                        </div>
                        <p className="mt-4 text-gray-700 leading-relaxed">{selectedReview.comment}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ReviewPage;
