import React, { useState } from "react";
import {FaUser, FaPhone,FaEnvelope,FaLock,FaUserShield,FaShoppingCart,FaUserCog,
FaCheckCircle,FaExclamationCircle} from "react-icons/fa";
import { ToastContainer,toast } from "react-toastify";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api.js";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    role: "user",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword) {
     toast.error("Please complete all required fields");
      return setError("Please complete all required fields");
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return setError("Passwords do not match");
    }

    setError("");
    setSuccess("");

    try {
      const postData = {
            role: formData.role,
            username: formData.username,
            phone: formData.phone,
            email: formData.email,
            password: formData.password, 
          //  confirmPassword: formData.confirmPassword,
      }

     const url = `${API_BASE_URL}/${API_ENDPOINTS.REGISTER}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(postData), // Convert object to JSON string
        });

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        toast.success(message);
        setSuccess(message);
        setFormData({
          role: "user",
          username: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(message);
        setError(message);
      }
    } catch (err) {
      toast.error("Registration failed, please try again!");
      setError("Registration failed, please try again!");
    }
  };

  return (
 <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1642388612878-a1a27d737120?w=1200&auto=format&fit=crop&q=80')",
      }}
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center lg:justify-end px-4"
    >
      <ToastContainer position="top-center" />

      <div
        className="
          bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl 
          w-full max-w-md border border-white/30 
          lg:mr-40 mx-auto
        "
      >
        <h2 className="text-4xl font-extrabold text-green-950 mb-6 text-center drop-shadow">
          🌱 Sign Up 🌱
        </h2>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-3 mb-4 text-sm font-semibold text-red-700 bg-red-100 border-l-4 border-red-600 rounded shadow-sm">
            <FaExclamationCircle className="text-red-600 text-lg" />
            <span>{error}</span>
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="flex items-center gap-3 p-3 mb-4 text-sm font-semibold text-green-800 bg-green-100 border-l-4 border-green-600 rounded shadow-sm">
            <FaCheckCircle className="text-green-700 text-lg" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

         
          <div className="flex items-center justify-between text-green-950 font-medium">
            <span className="flex items-center gap-2 text-lg font-bold whitespace-nowrap">
              <FaUserCog className="text-black" /> Select Role:
            </span>

            <div className="flex items-center gap-5 flex-shrink-0">
              <label className="flex text-black items-center gap-2 cursor-pointer whitespace-nowrap">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                  className="accent-black"
                />
                <FaUserShield className="text-black" /> Admin
              </label>

              <label className="flex text-black items-center gap-2 cursor-pointer whitespace-nowrap">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                  className="accent-black"
                />
                <FaShoppingCart className="text-black" /> Customer
              </label>
            </div>
          </div>

          {/* Username */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-lg" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2.5 text-lg pl-10 rounded-lg text-black border font-bold border-green-700 bg-white/90 focus:bg-white/70 placeholder-black focus:ring-2 focus:ring-green-700 shadow-sm"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2.5 text-lg pl-10 rounded-lg text-black border font-bold border-green-700 bg-white/90 focus:bg-white/70 placeholder-black focus:ring-2 focus:ring-green-700 shadow-sm"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2.5 text-lg pl-10 rounded-lg text-black border font-bold border-green-700 bg-white/90 focus:bg-white/70 placeholder-black focus:ring-2 focus:ring-green-700 shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
            <input
              type="password"
              name="password"
              placeholder="Password (8 Characters)"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2.5 text-lg pl-10 rounded-lg text-black border font-bold border-green-700 bg-white/90 focus:bg-white/70 placeholder-black focus:ring-2 focus:ring-green-700 shadow-sm"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2.5 text-lg pl-10 rounded-lg text-black border font-bold border-green-700 bg-white/90 focus:bg-white/70 placeholder-black focus:ring-2 focus:ring-green-700 shadow-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-gradient-to-r from-green-900 via-green-600 to-green-900 text-xl font-bold py-3 rounded-lg text-white shadow-md hover:scale-105 active:scale-95 transition-transform"
          >
            Sign Up
          </button>

          {/* Link to Login */}
          <p className="text-center text-lg font-bold text-green-950">
            Already have an account?
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="hover:text-black ml-1 underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
