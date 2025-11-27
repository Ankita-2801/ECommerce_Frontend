// src/components/OrderHistorySection.jsx
import { MdDateRange, MdOutlineLocalShipping } from "react-icons/md";
import React, { useState } from "react";
import {
  ShoppingBag,
  CalendarClock,
  PackageCheck,
  IndianRupee,
  Star,
  X,
} from "lucide-react";

const OrderHistorySection = ({ orders }) => {
  const [activeReview, setActiveReview] = useState(null); // { orderId, productName }
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Open review popup
  const handleReviewClick = (orderId, productName) => {
    setActiveReview({ orderId, productName });
    setReviewForm({ rating: 0, comment: "" });
    setErrorMsg("");
  };

  const handleInputChange = (e) => {
    setReviewForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRatingClick = (star) => {
    setReviewForm((prev) => ({ ...prev, rating: star }));
  };

  const handleSubmitReview = async () => {
    if (!reviewForm.rating || !reviewForm.comment) {
      alert("Please provide both a rating and a comment");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg("");

      const token = localStorage.getItem("token"); // Auth token
      const email = localStorage.getItem("email"); // User email
      if (!token || !email) {
        throw new Error("Authentication info missing. Please log in again.");
      }

      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product: activeReview.productName,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
          email: email, // Include email for backend
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review");
      }

      setSuccessMsg("Review submitted successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
      setActiveReview(null); // Close popup
    } catch (err) {
      console.error("Error submitting review:", err);
      setErrorMsg(err.message);
      setTimeout(() => setErrorMsg(""), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-100 text-gray-600">
        <div className="bg-white/70 backdrop-blur-xl border border-emerald-100 shadow-lg rounded-3xl p-10 flex flex-col items-center">
          <ShoppingBag className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
          <p className="text-2xl font-semibold">No Orders Yet</p>
          <p className="text-gray-500 mt-1 text-sm">
            Your future purchases will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-10 px-4">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent drop-shadow-sm">
          Your Order History
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Review your past purchases and order details
        </p>
      </div>

      {/* Orders Container */}
      <div className="max-w-5xl mx-auto space-y-8 max-h-[650px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-transparent custom-scrollbar-hide">
        {orders.map((order) => (
          <div
            key={order._id}
            className="group relative bg-white/70 backdrop-blur-lg border border-emerald-100 rounded-2xl shadow-md hover:shadow-2xl hover:border-emerald-200 transition-all duration-300 p-6"
          >
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-gray-800">
                  Order ID:{" "}
                  <span className="text-gray-600">{order._id.slice(-8)}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <CalendarClock className="w-4 h-4" />
                {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center mb-5 text-lg font-semibold text-emerald-700">
              <IndianRupee className="w-5 h-5 mr-1 text-emerald-600" />
              {order.cartTotal}
            </div>

            {/* Products */}
            <div className="border-t border-gray-200 pt-3">
              <h5 className="font-semibold text-gray-800 mb-2">Items Ordered:</h5>
              <ul className="space-y-2">
                {order.products.map((item) => (
                  <li
                    key={item.productId}
                    className="flex justify-between items-center text-gray-700 bg-gradient-to-r from-gray-50 to-emerald-50/30 border border-gray-100 rounded-lg px-3 py-2 hover:from-emerald-50 hover:to-white hover:border-emerald-300 transition-all duration-300"
                  >
                    <span>
                      {item.name}{" "}
                      <span className="text-gray-500">× {item.quantity}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">₹{item.price}</span>
                 

                      <button
                        onClick={() => handleReviewClick(order._id, item.name)}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Review
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
             
            </div>
           
            {/* Footer */}
            <div className="mt-5 flex justify-between items-center text-sm text-gray-600">
              
                <span className="text-emerald-700 font-medium text-sm">
   Expected Delivery:{" "}
  <span>{order.deliveryDate}</span>
</span>

              <span>
                Status:{" "}
                <span
                  className={`font-semibold ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-500"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status || "Processing"}
                </span>
              </span>
              <span className="italic text-gray-400">
                Last updated:{" "}
                {new Date(order.updatedAt || order.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Review Popup */}
      {activeReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setActiveReview(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-3">
              Review: {activeReview.productName}
            </h3>

            {errorMsg && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {errorMsg}</span>
              </div>
            )}

            <div className="mb-3 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= reviewForm.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  } cursor-pointer`}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
            </div>

            <textarea
              name="comment"
              value={reviewForm.comment}
              onChange={handleInputChange}
              placeholder="Write your review..."
              rows={4}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 mb-4"
            />

            <button
              onClick={handleSubmitReview}
              disabled={submitting}
              className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg z-50">
          {successMsg}
        </div>
      )}
    </div>
  );
};

export default OrderHistorySection;