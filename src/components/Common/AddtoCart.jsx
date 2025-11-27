import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Heart, Trash2 } from "lucide-react";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import { ToastContainer,toast } from "react-toastify";
const AddtoCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
 
  const email = useLocation().state?.email || '';
  useEffect(() => {
    if (!email) return;
  
    const fetchCart=async()=>{
      try{
       const res=await axios.get(`${API_BASE_URL}/${API_ENDPOINTS.FETCH_CART}`,
        {params: {email}})
        setCartItems(res.data.items)
      }catch(err){}
    }
    fetchCart();
  }, [email]);

  const handleRemove = async(product) => {
    
    
    try{
     const response=await axios.delete('http://localhost:5000/api/user/delcart',
     {
      
      data:   { productId: product._id,
          email: email,}
        
      })
      setCartItems(response.data.allitem) 
    
    }catch(err){
      console.log(err)
    }
  };




  const handleMoveToWishlist = async(product) => {
  
     try {
      const wishres = await axios.post(
        "http://localhost:5000/api/user/addwish", // <-- URL fixed here
        { productId: product._id, email: email, productname: product.name }
      );

      toast.success(`${product.name} is added to wishlist!`);

     
    } catch (err) {
      toast.error(`${product.name} is already in wishlist!`);
      console.log(err);
      
    }
  await handleRemove(product);
    
  };

  const total = (cartItems || []).reduce(
  (acc, item) => acc + item.totalPrice * (item.quantity || 1),0
  
);



  const handleContinue = () => {
    
    navigate('/checkout',{state:{email}});
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-green-800 hover:text-green-900 font-semibold transition"
      >
        <ArrowLeft size={24} />
        <span>Back</span>
      </button>
    {/* Toast container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}       // toast disappears after 3 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <h1 className="text-3xl font-bold text-green-800 mb-8 flex items-center gap-2">
        <ShoppingBag className="text-green-700" /> Cart
      </h1>

      {cartItems?.length === 0 ? (
        <div className="flex flex-col items-center mt-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
            alt="Empty cart"
            className="w-100 h-100 mb-4 opacity-80"
          />
          <p className="text-gray-600 mb-4 text-lg">Your cart is empty!</p>
          <button
            onClick={() => navigate("/products",{state: {email} })}
            className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-green-700 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-lg border-2 border-green-700 p-6">
          <div className="space-y-6">
            {cartItems?.map((product) => (
              <div
                key={product._id}
                className="flex flex-col md:flex-row items-center gap-6 border-b pb-6"
              >
                <img
                  src={product.imageUrl || "https://via.placeholder.com/120"}
                  alt={product.name}
                  className="w-50 h-60 object-cover rounded-md shadow-md"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-yellow-700">{product.name}</h2>
                  <p className="text-black mt-1">{product.description}</p>
                  <p className="text-lg font-semibold text-green-800 mt-2">Quantity: {product.quantity}</p>
                  <p className="text-lg font-semibold text-blue-950 mt-2">Actual Price: ₹{product.price*(product.quantity)||1}</p>
                  <p className="text-lg font-semibold text-pink-900 mt-2">{product.discount > 0
    ? `${product.discount * product.quantity}%`
    : "No Discount Available"}</p>
                  <p className="text-lg font-semibold text-pink-900 mt-2">GST: {product.gst*(product.quantity)}%</p>
                  <p className="text-lg font-semibold text-blue-950 mt-2">Total Price: ₹{product.totalPrice*(product.quantity)||1}</p>
                  
                  <div className="flex gap-3 mt-4">
                    
                    <button
                      onClick={() => handleRemove(product)}
                      className="flex items-center gap-2 bg-red-900 text-white border border-red-900 px-3 py-1   transition"
                    >
                      <Trash2 size={18} className="text-white"/> REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t pt-6">
            <h3 className="text-2xl font-semibold text-orange-600">Total: ₹{total}</h3>
            <button
              onClick={handleContinue}
              className="mt-4 md:mt-0 bg-green-700 text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-green-800 transition"
            >
              CONTINUE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddtoCart;
