import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api.js";
import axios from "axios";

// Icons
import { ArrowLeft, Trash2, Edit2 } from "lucide-react";
import { AiOutlineCreditCard, AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineHome } from "react-icons/ai";
import { FaCreditCard } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { MdDateRange, MdOutlineLocalShipping } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";



const CheckoutPage = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  //const email = query.get("email");
 const email = useLocation().state?.email || '';
 const transactionId = useLocation().state?.transactionId || '';
  const stock=Number(query.get("stock"));
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState({ username: "", phone: "", email: email || "", address: "" });
  const [editing, setEditing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryDate,setDeliveryDate]=useState(null);
  const [today,setToday]=useState(null);
  const [days,setDays]=useState(null);
  const source="Salt Lake, Kolkata, India"
  useEffect(()=>{
    const createDeliveryDate=async()=>{
      try{
      const response=await axios.get(`${API_BASE_URL}/${API_ENDPOINTS.DELIVERY_DATE}`,
        {params: {
          sourceAddress: source, 
          destAddress: userInfo.address
        }
        })
        const delivery=response.data
       setDeliveryDate(delivery?.deliveryDate || "");
       setToday(delivery?.todayDate || "");
       setDays(delivery?.deliveryDays || "");

    }
  catch(err){}
    }
    if (userInfo.address) { 
        createDeliveryDate();
    }
  },[userInfo])


  useEffect(() => {
   
   const fetchCart=async(req,res)=>{
   try{
       const res=await axios.get(`${API_BASE_URL}/${API_ENDPOINTS.FETCH_CART}`,{params: {email}})
      setCartItems(res.data.items)
      }
   catch(err){}
  }
  fetchCart();
  
  }, [email]);

  // Fetch user profile from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          `${API_BASE_URL}/${API_ENDPOINTS.CHECK_USER}?email=${encodeURIComponent(email)}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error(errorData.msg || `HTTP error! status: ${response.status}`);
          return;
        }

        const data = await response.json();
        setUserInfo({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    if (email) fetchUserProfile();
  }, [email]);

const totalPrice = (cartItems || []).reduce(
  (acc, item) => acc + item.totalPrice * (item.quantity || 1),0);

  const handleFieldChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setEditing(false);
   
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Not authorized");
        return;
      }

      const { username, email, phone, address } = userInfo;

      const res = await axios.put(
        `${API_BASE_URL}/${API_ENDPOINTS.EDIT_USER}`,
        { username, email, phone, address },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;
   
      setUserInfo(data.user || userInfo);
   
    } catch (error) {
      console.error("Profile update failed:", error);
      alert(error.response?.data?.msg || "Something went wrong while updating profile.");
    }
  };

  const handleConfirmOrder = async () => {
    if (!paymentMethod) {
      MySwal.fire({
      icon: "warning",
      title: "Payment Method Required",
      text: "Please select payment method to proceed further.",
      confirmButtonColor: "#3085d6",
    });
      return;
    }
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }
if (paymentMethod === "UPI") {
  const payload = {
      user: {
    username: userInfo.username,
    email: userInfo.email,
    address: userInfo.address,
    phone: userInfo.phone
  },
        products: cartItems,
        cartTotal: totalPrice,
        paymentMethod,
        transactionId,
        today: today,
         days: days.toString(),
        deliveryDate: deliveryDate,
       };
    navigate("/payment", {
      state: payload
    });
    return; // Stop execution here
  }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Not authorized");
        return;
      }

      const payload = {
      user: {
    username: userInfo.username,
    email: userInfo.email,
    address: userInfo.address,
    phone: userInfo.phone
  },
        products: cartItems,
        cartTotal: totalPrice,
        paymentMethod,
        today: today,
         days: days.toString(),
        deliveryDate: deliveryDate,
       };

      await axios.post(`${API_BASE_URL}/${API_ENDPOINTS.CHECKOUT_ORDER}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
 
  
  
  MySwal.fire({
  icon: "success",
  title: "Order Confirmed!",
  text: "Your order has been placed successfully.",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});
    handleAfterConfirm();
  
      setCartItems([]);
      navigate("/user");

    } catch (error) {
      console.error("Order creation failed:", error);
      alert(error.response?.data?.message || "Failed to create order");
    }
  };

const handleAfterConfirm=async(req,res)=>{
  try{
    const res=await axios.post(`${API_BASE_URL}/${API_ENDPOINTS.DELETE_ALLCART}`,{email:email})
  }catch(err){}
}

  const handleCancel = () => {
    navigate("/addcart?email=" + encodeURIComponent(email));
  };

  const handleRemoveItem = async(item) => {
     
    try{
     const response=await axios.delete('http://localhost:5000/api/user/delcart',
     {
      
      data:   { productId: item._id,
          email: email,}
        
      })
      setCartItems(response.data.allitem) 
    
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-8 flex flex-col items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-green-800 hover:text-green-900 font-semibold transition"
      >
        <ArrowLeft size={24} />
        Back
      </button>

      <h1 className="text-3xl font-bold text-green-800 mb-8">CHECKOUT</h1>

      {/* Cart Items */}
      <div className="w-full max-w-4xl bg-white border-2 border-green-950 shadow-lg p-6  mb-8">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Your Products</h2>
        <div className="space-y-4">
          {cartItems.length === 0 && <p className="text-gray-500">No items in cart.</p>}
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 border-b pb-4">
              <img
                src={item.imageUrl || "https://via.placeholder.com/100"}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md shadow"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-700">{item.name}</h3>
                <p className="text-gray-800">{item.description}</p>
                <p className="text-md text-blue-800 font-semibold">₹{item.totalPrice*item.quantity}</p>
              </div>
              <Trash2
                className="text-red-500 cursor-pointer"
                size={20}
                onClick={() => handleRemoveItem(item)}
              />
            </div>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-orange-700 mt-4">Total: ₹{totalPrice}</h3>
      </div>

      {/* User Info */}
     <div className="w-full max-w-4xl bg-white  p-2  mb-4">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold text-orange-600">Your Information</h2>
    <button
      onClick={() => {
        if (editing) handleSave();
        setEditing(!editing);
      }}
      className="flex items-center gap-2 text-green-600 font-semibold hover:text-blue-800 transition"
    >
      <Edit2 size={18} /> {editing ? "Save" : "Edit"}
    </button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2  gap-2 text-lg">
    {[
      { field: "username", label: "Name", icon: <AiOutlineUser size={20} /> },
      { field: "phone", label: "Phone", icon: <AiOutlinePhone size={20} /> },
      { field: "email", label: "Email", icon: <AiOutlineMail size={20} /> },
      { field: "address", label: "Address", icon: <AiOutlineHome size={20} /> },
    ].map(({ field, label, icon }) => (
      <div key={field} className="flex items-center gap-2">
        <label className="text-orange-700 font-semibold flex items-center gap-2 min-w-[100px]">
          {icon} {label}:
        </label>
        <input
          type="text"
          value={userInfo[field]}
          disabled={!editing}
          onChange={(e) => handleFieldChange(field, e.target.value)}
          className={`flex-1 px-2 py-1 font-semibold text-lg ${
            editing
              ? "bg-white border-b-2 border-blue-900"
              : "text-black cursor-not-allowed outline-none"
          }`}
        />
      </div>
    ))}
  </div>
</div>


      {/* Payment Method */}
   <div className="w-full max-w-4xl bg-white mb-8 p-2 rounded ">
  <div className="  items-center gap-6">

    {/* Ordered At */}
    <p className="text-lg font-semibold text-black flex items-center gap-2">
      <MdDateRange className="text-red-900" size={22} />
      Ordered At: {today ? new Date(today).toDateString() : "Loading..."}
    </p>

    {/* Delivery Expected */}
    <p className="text-lg font-semibold text-black flex items-center gap-2">
      <MdOutlineLocalShipping className="text-green-700" size={22} />
      Delivery Expected Within {days} {days === 1 ? "Day" : "Days"}
    </p>

    {/* Delivery Date */}
    <p className="text-lg font-semibold text-black flex items-center gap-2">
      <MdOutlineLocalShipping className="text-blue-700" size={22} />
      Delivery Date: {deliveryDate ? new Date(deliveryDate).toDateString() : "Loading..."}
    </p>

    {/* Payment Method Heading */}
   <div className="flex items-center gap-6 mt-4">
  <h2 className="text-xl font-semibold text-red-900">
    Payment Method:
  </h2>

  {/* Payment Options */}
 <label className="flex items-center gap-2 cursor-pointer font-semibold text-red-950">
  <input
    type="radio"
    name="payment"
    value="UPI"
    checked={paymentMethod === "UPI"}
    onChange={(e) => setPaymentMethod(e.target.value)}
    className="accent-red-950 w-5 h-5"
  />
  <MdPayment size={22} className="text-red-900" />
  <span>UPI</span>
</label>



  <label className="flex items-center gap-2 cursor-pointer font-semibold text-red-950">
    <input
      type="radio"
      name="payment"
      value="Cash on Delivery"
      checked={paymentMethod === "Cash on Delivery"}
      onChange={(e) => setPaymentMethod(e.target.value)}
      className="accent-red-950 w-5 h-5"
    />
    <GiMoneyStack size={22} className="text-red-900" />
    <span>Cash On Delivery</span>
  </label>
</div>

  </div>
</div>
  

      {/* Actions */}
     <div className="flex flex-row gap-4 flex-wrap">
  <button
    onClick={handleCancel}
    className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-red-700 transition flex-1 min-w-[120px]"
  >
    CANCEL
  </button>
  <button
    onClick={handleConfirmOrder}
    className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-green-800 transition flex-1 min-w-[120px]"
  >
    CONFIRM
  </button>
</div>

    </div>
  );
};

export default CheckoutPage;
