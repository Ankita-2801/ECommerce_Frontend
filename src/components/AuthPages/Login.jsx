import React, { useState,useEffect } from "react";
import {FaEnvelope,FaLock,FaUserShield,FaShoppingCart,FaUserCog,FaGoogle} from "react-icons/fa";
import { ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { ToastContainer,toast } from "react-toastify";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    role: "user",
    email: "",
    password: "",
  });

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return setError("Please fill in all required fields");
    }
    setError("");
    setSuccess("");

    try {
      const url = `${API_BASE_URL}/${API_ENDPOINTS.LOGIN}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      const { success, message, jwtToken, username,role } = result;

      if (success) {
        toast.success(message);
        setSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedUser", username);
        localStorage.setItem("role", role);
        localStorage.setItem("email", formData.email); 
        if(result.role === 'admin'){
        setTimeout(() => {
          navigate("/admin");
        }, 1500);
       }
       if(result.role === 'user'){
        setTimeout(() => {
          navigate("/user");
        }, 1500);
       }
      } else {
        toast.error(message || "Invalid credentials, please try again.");
        setError(message || "Invalid credentials, please try again.");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Try again.");
      setError(err.message || "Something went wrong. Try again.");
    }
  };

  const googleLogin=async(e)=>{
     window.location.href = `${API_BASE_URL}/${API_ENDPOINTS.GOOGLELOGIN}`;
  }

useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const role = urlParams.get("role");
    const error = urlParams.get("error");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success(`Welcome back, ${role}!`, { autoClose: 3000 });

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }

    if (error === "AccountNotFound") {
      toast.error("This Google account is not registered!", { autoClose: 4000 });
    }
  }, [navigate]);

  return (
    <div
  style={{
    backgroundImage:
      "url('https://media.istockphoto.com/id/1304141544/photo/essential-oils-with-rosemary-cloves-cinnamon.jpg?s=612x612&w=0&k=20&c=jQFlCPP5Jn--ZIky9yE2jZCAmdgboh4kIpPMSipWhto=')",
  }}
  className="
    min-h-screen w-full bg-cover bg-center

    flex flex-col
    items-center justify-center

    lg:flex-row lg:justify-start lg:items-start lg:pl-24

    px-4 py-10
  "
>
  <ToastContainer position="top-center" autoClose={2000} />

  {/* Login Card */}
  <div
    className="
      bg-white/20 backdrop-blur-md 
      p-6 sm:p-8 
      rounded-2xl shadow-2xl 
      w-full max-w-md 
      border border-white/30 
      lg:ml-20
    "
  >
    <h2 className="text-3xl sm:text-4xl font-extrabold text-green-950 text-center mb-6 drop-shadow">
      ☘ Login ☘
    </h2>

    {/* Error & Success */}
    {error && (
      <div className="flex items-center justify-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-3 text-sm font-semibold shadow-sm">
        <ExclamationCircleIcon className="h-5 w-5 text-red-700" />
        {error}
      </div>
    )}

    {success && (
      <div className="flex items-center justify-center gap-2 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg mb-3 text-sm font-semibold shadow-sm">
        <CheckCircleIcon className="h-5 w-5 text-green-700" />
        {success}
      </div>
    )}

    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      
    
      {/* Role Selection */}
<div className="flex flex-wrap items-center justify-between text-red-950 font-medium gap-3">

  <span className="flex items-center gap-2 text-lg font-semibold whitespace-nowrap">
    <FaUserCog className="text-red-950" />
    Select Role:
  </span>

  <div className="flex gap-4 flex-nowrap">
    <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap">
      <input
        type="radio"
        name="role"
        value="admin"
        checked={formData.role === "admin"}
        onChange={handleChange}
        className="accent-green-700"
      />
      <FaUserShield className="text-red-950" /> Admin
    </label>

    <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap">
      <input
        type="radio"
        name="role"
        value="user"
        checked={formData.role === "user"}
        onChange={handleChange}
        className="accent-green-700"
      />
      <FaShoppingCart className="text-red-950" /> Customer
    </label>
  </div>
</div>


      {/* Email */}
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-950 text-lg" />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 pl-10 rounded-lg font-bold text-lg border border-red-950 bg-white/70 text-green-950 placeholder-red-950 focus:ring-2 focus:ring-red-950 focus:outline-none shadow-sm"
        />
      </div>

      {/* Password */}
      <div className="relative">
        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-950 text-lg" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 pl-10 rounded-lg border border-red-950 bg-white/70 font-bold text-green-950 placeholder-red-950 focus:ring-2 focus:ring-red-950 focus:outline-none shadow-sm text-lg"
        />
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate("/forgot")}
          className="text-lg text-white font-bold hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="bg-gradient-to-r from-red-950 via-yellow-600 to-red-950 text-xl font-bold py-2 rounded-lg text-white shadow-md hover:scale-105 active:scale-95 transition-transform"
      >
        Sign In
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-grow h-px bg-red-950"></div>
        <span className="text-red-950 font-bold">OR</span>
        <div className="flex-grow h-px bg-red-950"></div>
      </div>

      {/* Google Login */}
      <button
        type="button"
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-950 via-yellow-600 to-red-950 text-lg font-bold py-2 px-4 rounded-lg text-white shadow-md hover:scale-105 active:scale-95 transition-transform"
        onClick={googleLogin}
      >
        <FaGoogle className="text-xl" />
        Continue with Google
      </button>

      {/* Sign Up */}
      <p className="text-center text-lg font-bold text-green-950">
        Don't have an account?
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="hover:text-yellow-700 ml-2 underline"
        >
          Sign Up
        </button>
      </p>
    </form>
  </div>
</div>


  );
}

export default Login;
