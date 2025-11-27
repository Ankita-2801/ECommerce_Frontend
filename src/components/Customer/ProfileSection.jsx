import React, { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api.js";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const ProfileSection = ({ user, onUpdateProfile }) => {
   const MySwal = withReactContent(Swal);


  const [name, setName] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please log in.");
          return;
        }

        const response = await axios.get(
          `${API_BASE_URL}/${API_ENDPOINTS.PROFILE_ME}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        setName(data.username || "");
        setEmail(data.email || "");
        setAddress(data.address || "");
        setPhone(data.phone || "");
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Not authenticated!");

      const res = await axios.put(
        `${API_BASE_URL}/${API_ENDPOINTS.PROFILE_ME}`,
        { username: name, email, address, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data;
     // alert("Profile updated successfully!");
      MySwal.fire({
      icon: "success",
      title: "Profile is updated successfully!",
     
      confirmButtonColor: "#0f0",
    });
      if (onUpdateProfile) onUpdateProfile(data.user || data);
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "An error occurred while updating the profile."
      );
    }
  };

  // Live Time & Date Component
  const CurrentTime = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(interval);
    }, []);

    const formattedDate = time.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const formattedTime = time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return (
      <div className="flex flex-col items-center mt-4 text-white">
        <span className="text-lg font-semibold">{formattedTime}</span>
        <span className="text-sm text-white/80">{formattedDate}</span>
      </div>
    );
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">Loading profile...</div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-600">Error: {error}</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-8 mb-8 shadow-lg flex flex-col items-center text-white">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center mb-4">
          <UserCircleIcon className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-3xl font-bold">{name || "User Name"}</h1>
        <p className="mt-1 text-white/90">{email || "user@example.com"}</p>
        <CurrentTime />
      </div>

      {/* Profile Edit Card */}
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-6 relative z-10 overflow-y-auto max-h-[65vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <UserCircleIcon className="w-6 h-6 text-emerald-600" /> Edit Profile
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 shadow-sm"
              placeholder="Your full name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 shadow-sm"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 shadow-sm"
              placeholder="123 Street, City, Country"
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 shadow-sm"
              placeholder="+1 234 567 890"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSection;