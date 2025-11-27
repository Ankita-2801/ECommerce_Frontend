import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL,API_ENDPOINTS } from "@/config/api";
import QRCode from "react-qr-code";
import { AiOutlineClose } from "react-icons/ai";
import { FaCreditCard } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Payment = () => {
  const MySwal = withReactContent(Swal);

  const location = useLocation();
  const navigate = useNavigate();
 const details=location.state;
// const {email,total}=state;
 const {
    user,
    products,
    cartTotal,
    paymentMethod,
    today,
    days,
    deliveryDate,
    
  } = details || {};
 // const email = location.state?.email || "";
//  const  total  = location.state?.total || {};
  const [showModal, setShowModal] = useState(true);
  const [transactionId, setTransactionId] = useState("");
  // UPI details
  const upiId = import.meta.env.VITE_UPI_ID;
  const name = import.meta.env.VITE_UPI_NAME;
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${cartTotal}&cu=INR`;

  const handleClose = () => {
    setShowModal(false);
    navigate("/checkout", { state: { email:user.email } });
  };
const handleAfterConfirm = async() => {
    try{
    const res=await axios.post(`${API_BASE_URL}/${API_ENDPOINTS.DELETE_ALLCART}`,{email:user.email})
  }catch(err){}
  };
  const handleConfirm = async () => {
     if (!transactionId) {
    MySwal.fire({
      icon: "warning",
      title: "UPI Transaction ID Required",
      text: "Please enter your UPI transaction ID to confirm payment.",
      confirmButtonColor: "#3085d6",
    });
    return;
  }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Not authorized");
        return;
      }

      const payload = {
      user: {
    username: user.username,
    email: user.email,
    address: user.address,
    phone: user.phone
  },
        products: products,
        cartTotal: cartTotal,
        paymentMethod,
        transactionId: transactionId,
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
  timer: 2000,
  timerProgressBar: true,
});
    handleAfterConfirm();
  
     
      navigate("/user");

    } catch (error) {
      console.error("Order creation failed:", error);
      alert(error.response?.data?.message || "Failed to create order");
    }
  };
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 relative w-full max-w-md animate-fadeIn">
            <button onClick={handleClose} className="absolute top-3 right-3 text-gray-700 hover:text-red-600">
              <AiOutlineClose size={24} />
            </button>

            <h1 className="text-2xl font-semibold text-green-700 mb-4 text-center">Scan & Pay</h1>

            <div className="bg-green-100 text-green-800 font-semibold text-xl px-6 py-2 rounded-full mb-4 shadow-inner text-center">
              Amount: ₹{cartTotal}
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-center">
              <QRCode value={upiLink} size={200} />
            </div>

            <p className="text-gray-600 text-center text-sm">
              1. Open your UPI app (Google Pay, PhonePe, Paytm, etc.)<br />
              2. Scan the QR code above<br />
              3. Pay ₹{cartTotal} to complete the transaction
            </p>
            <div className="mt-4">
              <label className="font-semibold text-green-800 flex items-center gap-2 mb-2">
                <FaCreditCard size={20} /> Enter UPI Transaction ID:
              </label>
              <input
                type="text"
                placeholder="e.g. TXN123456789"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full border-b-2 border-green-700 p-2 rounded text-lg focus:outline-none "
              />
            </div>

            {/* OK Button */}
            <button
              onClick={handleConfirm}
              className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-md transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
