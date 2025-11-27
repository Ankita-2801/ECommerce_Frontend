// UserReviews.jsx
import React, { useState, useEffect } from "react";
import { Star, ThumbsUp, User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "http://localhost:5000/api";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markedHelpful, setMarkedHelpful] = useState({});

  const token = localStorage.getItem("token"); // JWT token

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/reviews`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [token]);

  // Mark review as helpful
  const handleMarkHelpful = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${id}/helpful`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to mark helpful");

      const updated = await res.json();
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? updated : r))
      );
      setMarkedHelpful((prev) => ({ ...prev, [id]: true }));
      toast.success("Marked as helpful!");
    } catch (err) {
      console.error(err);
      toast.error("Unable to mark helpful.");
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-700">Loading reviews...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" autoClose={2000} />
      <h1 className="text-3xl font-bold mb-6">User Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col"
            >
              <div className="flex items-center mb-3">
                <User className="text-green-600 mr-2" size={20} />
                <p className="font-semibold">{review.userName || "Anonymous"}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-4">“{review.comment}”</p>

              {/* Helpful Button */}
              <button
                onClick={() => handleMarkHelpful(review._id)}
                disabled={markedHelpful[review._id]}
                className={`flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-50 transition ${
                  markedHelpful[review._id]
                    ? "text-blue-500 cursor-not-allowed"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <ThumbsUp size={16} />
                <span>{review.helpful || 0}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviews;
