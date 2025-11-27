// UserDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  User,
  Star,
  Heart,
  PackageCheck,
  Mail,
  LogOut,
  ShoppingCart,
  Menu,
  X
} from "lucide-react";
import ProfileSection from "./ProfileSection.jsx";
import UserReviews from "./UserReviews.jsx";
import Wishlist from "./WishList.jsx";
import OrderHistorySection from "./OrderHistorySection.jsx";
import ContactUsPage from "./ContactAdminSection.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api.js";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          setError("Not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${API_BASE_URL}/${API_ENDPOINTS.PROFILE_ME}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // Fetch wishlist and orders
  useEffect(() => {
    if (!user) return;

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/${API_ENDPOINTS.WISHLIST}`,
          { params: { email: user.email } }
        );
        setWishlist(res.data.items || []);
      } catch {
        setWishlist([]);
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/${API_ENDPOINTS.USER_ORDER}`,
          { params: { email: user.email } }
        );
        setOrders(res.data || []);
      } catch {
        setOrders([]);
      }
    };

    fetchWishlist();
    fetchOrders();
  }, [user]);

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection user={user} onUpdateProfile={setUser} />;
      case "reviews":
        return <UserReviews />;
      case "wishlist":
        return <Wishlist user={user} />;
      case "orders":
        return <OrderHistorySection orders={orders} />;
      case "contact":
        return <ContactUsPage />;
      default:
        return null;
    }
  };

  if (loading)
    return <div className="text-center p-6 text-gray-700">Loading...</div>;
  if (error)
    return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Mobile Top Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white h-16 shadow-md z-30 flex items-center justify-between px-4">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-7 h-7 text-green-700" />
        </button>

        <h1 className="text-xl font-bold text-green-700">GreenRemedy 🌱</h1>

        <span />
      </div>

      {/*Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-md p-6 flex flex-col justify-between
          transform transition-transform duration-300 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Close Button (Mobile Only) */}
        <button
          className="lg:hidden absolute top-4 right-4"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-6 h-6 text-green-700" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-green-700 mb-6">
            GreenRemedy 🌱
          </h1>

          <nav className="space-y-2">
            <button
              onClick={() => { setActiveSection("profile"); setSidebarOpen(false); }}
              className={`flex items-center gap-2 w-full p-2 rounded hover:bg-green-50 ${
                activeSection === "profile" ? "bg-green-100" : ""
              }`}
            >
              <User className="w-5 h-5 text-green-600" /> Profile
            </button>

            <button
              onClick={() => { setActiveSection("reviews"); setSidebarOpen(false); }}
              className={`flex items-center gap-2 w-full p-2 rounded hover:bg-green-50 ${
                activeSection === "reviews" ? "bg-green-100" : ""
              }`}
            >
              <Star className="w-5 h-5 text-green-600" /> Reviews
            </button>

            <button
              onClick={() => { setActiveSection("wishlist"); setSidebarOpen(false); }}
              className={`flex items-center gap-2 w-full p-2 rounded hover:bg-green-50 ${
                activeSection === "wishlist" ? "bg-green-100" : ""
              }`}
            >
              <Heart className="w-5 h-5 text-green-600" /> Wishlist
            </button>

            <button
              onClick={() => { setActiveSection("orders"); setSidebarOpen(false); }}
              className={`flex items-center gap-2 w-full p-2 rounded hover:bg-green-50 ${
                activeSection === "orders" ? "bg-green-100" : ""
              }`}
            >
              <PackageCheck className="w-5 h-5 text-green-600" /> Orders
            </button>

            <button
              onClick={() => { setActiveSection("contact"); setSidebarOpen(false); }}
              className={`flex items-center gap-2 w-full p-2 rounded hover:bg-green-50 ${
                activeSection === "contact" ? "bg-green-100" : ""
              }`}
            >
              <Mail className="w-5 h-5 text-green-600" /> Contact Admin
            </button>

            <button
              onClick={() => navigate("/products", { state: { email: user.email } })}
              className="flex items-center justify-center gap-2 w-full p-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              <ShoppingCart className="w-5 h-5" /> Shop Now
            </button>
          </nav>
        </div>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 w-full p-2 rounded hover:bg-red-50 text-red-600 font-medium"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/*  Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">

        {/* Desktop Header */}
        <header className="hidden lg:flex bg-white shadow-md h-16 items-center justify-between px-6 sticky top-0">
          <h2 className="text-xl font-semibold text-gray-700">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h2>
          <p className="text-gray-600 font-medium">
            Logged in as: <span className="font-semibold">{user?.username || user?.email}</span>
          </p>
        </header>

        {/* Mobile Header */}
        <div className="lg:hidden mt-16 px-4 py-3 bg-white shadow">
          <h2 className="text-lg font-semibold text-gray-700">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h2>
        </div>

        <main className="flex-1 overflow-y-auto p-6">{renderSection()}</main>
      </div>
    </div>
  );
};

export default UserDashboard;
