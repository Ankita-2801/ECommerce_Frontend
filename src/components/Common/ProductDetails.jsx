import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";

const ProductDetails = ({ product, useremail, onClose }) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [stock,setStock]=useState(product.stock)
  
  const [quantity, setQuantity] = useState(1);
  const handleQuantity=async(quantity)=>{
    setQuantity(quantity);
   const newstock=product.stock-quantity;
    setStock(newstock);
  
  }
  if (!product) return null;

  
  const calculatedPrice = product.price * quantity;
  const calculatedTotal = product.totalPrice * quantity;

  const handlePlaceOrder = async () => {
    if (!useremail) {
      console.error("Email not found in props!");
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${API_ENDPOINTS.CART_ADD}`,
        { productId: product._id, email: useremail, productname: product.name,
          quantity:quantity });
      navigate("/addcart", { state: { email: useremail } });
    } catch (err) {}
 //   navigate('/addcart',{state:{email:useremail}});
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/${API_ENDPOINTS.FETCH_REVIEW}/${encodeURIComponent(product.name)}`
        );
        setReviews(res.data.reviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [product.name]);

  return (
   <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 p-4 overflow-y-scroll">
  <div className="relative bg-white shadow-2xl w-full max-w-6xl 
      flex flex-col md:flex-row 
      animate-fadeIn p-4 md:p-6 gap-6 
      max-h-[90vh] overflow-y-auto custom-scrollbar-hide">

    {/* Close Button */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 rounded-full bg-gray-800 text-white p-2 hover:bg-gray-700 transition"
    >
      <X size={24} />
    </button>

    {/* IMAGE — mobile: full width on top, desktop: left side */}
    <div className="w-full md:w-1/2 h-64 md:h-auto flex items-center justify-center bg-white overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
      />
    </div>

    {/* DETAILS — mobile stacked below image */}
    <div className="w-full md:w-1/2 flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold text-green-700 mb-3">{product.name}</h2>

        <p className="text-red-900 text-xl font-semibold mb-4">
          {product.category} - {product.subcategory}
        </p>

        <p className="text-black mb-4">{product.description}</p>

        {/* Quantity Selector */}
        <div className="mb-4">
          <label className="text-lg font-semibold text-yellow-700 mr-3">
            Quantity:
          </label>

          <select
            value={quantity}
            onChange={(e) => handleQuantity(Number(e.target.value))}
            className="border border-gray-400 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            {[...Array(stock).keys()].map((q) => (
              <option key={q + 1} value={q + 1}>
                {q + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Prices */}
        <p className="text-xl font-semibold text-blue-950 mb-2">
          Actual Price: ₹{calculatedPrice}
        </p>

        <p className="text-xl font-semibold text-pink-800 mb-2">
          {product.discount > 0
            ? `${product.discount * product.quantity}%`
            : "No Discount Available"}
        </p>

        <p className="text-xl font-semibold text-pink-800 mb-2">
          GST: {product.gst} %
        </p>

        <p className="text-xl font-semibold text-blue-950 mb-2">
          Total Price: ₹{calculatedTotal}
        </p>

        <p
          className={`mb-6 font-medium ${
            stock > 0 ? "text-yellow-600" : "text-red-500"
          }`}
        >
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </p>

        {/* Reviews */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3 text-purple-700">Reviews</h3>

          {reviews.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar-hide">
              {reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-2">
                  <p className="font-semibold text-yellow-900">{review.userName}</p>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-md font-semibold text-green-800">
                    Rating: {review.rating}/5
                  </p>
                  <p className="text-sm text-black">
                    Date: {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Place Order */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handlePlaceOrder}
          disabled={stock <= 0}
          className={`px-5 py-2 font-semibold mb-5 transition duration-200 ${
            stock <= 0
              ? "bg-gray-500 cursor-not-allowed text-white"
              : "bg-red-800 text-white hover:bg-green-700"
          }`}
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default ProductDetails;
