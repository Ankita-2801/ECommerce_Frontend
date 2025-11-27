import React, { useEffect, useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";

const Wishlist = ({user}) => {
  const email = user?.email;
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
//  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWishlist();
  }, [email]);

   const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/${API_ENDPOINTS.WISHLIST}`,
          { params: {email: email} }
        );
        setWishlist(res.data.items || []);
      } catch (err) {
        console.error(err);
        setWishlist([]);
      }
    };
 const removeItem = async (e,item) => {
  e.stopPropagation();
     try {
      const res = await axios.delete(
        `http://localhost:5000/api/user/delwish`, // <-- URL fixed here
        {
          data: { productname: item.name, email: email },
        }
      );

     toast.success(`${item.name} is removed from wishlist! Refresh the page to see changes.`);

      
    } catch (err) {
     
      toast.error("Failed to remove from wishlist");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );

  if (!wishlist || wishlist.length === 0)
    return (
      <div className="text-center py-20">
        <Heart className="mx-auto w-20 h-20 text-rose-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty!</h2>
        <p className="text-gray-500 mb-4">Add some products you love.</p>
      </div>
    );

  return (
    <div className="p-6">
      <ToastContainer position="top-center" autoClose={5000} />
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Heart className="text-rose-500" /> My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative h-40 bg-gray-100">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center text-gray-300">
                  <Heart className="w-10 h-10" />
                </div>
              )}
            </div>

            <div className="p-3 flex flex-col justify-between h-44">
              <div>
                <h3 className="font-semibold text-md text-gray-800 mb-1 line-clamp-1">{item.name}</h3>
                <p className="text-rose-600 font-bold text-sm mb-1">₹{item.price?.toFixed(2)}</p>
                <p className="text-gray-500 text-sm line-clamp-2">{item.description || "No description available"}</p>
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  onClick={(e) => removeItem(e,item)}
                  className="flex-1 py-1.5 px-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center justify-center gap-1 text-sm transition"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
