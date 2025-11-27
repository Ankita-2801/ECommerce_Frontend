import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "@/components/Customer/UserDashboard.jsx";
import ProfileSection from "@/components/Customer/ProfileSection.jsx";
import OrderHistorySection from "@/components/Customer/OrderHistorySection.jsx";
import WishlistSection from "@/components/Customer/WishList.jsx";
import ReviewsSection from "@/components/Customer/ReviewsSection.jsx";

import AddressBookSection from "@/components/Customer/AddressBookSection.jsx";
import ContactAdminSection from "@/components/Customer/ContactAdminSection.jsx";
import UserReview from "@/components/Customer/UserReviews.jsx";


const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard/>}/>
        {/* Core sections */}
        <Route path="profile" element={<ProfileSection />} />
        <Route path="orders" element={<OrderHistorySection />} />
        <Route path="wishlist" element={<WishlistSection />} />
        <Route path="reviews" element={<ReviewsSection />} />
        
        <Route path="address-book" element={<AddressBookSection />} />
        <Route path="contact-admin" element={<ContactAdminSection />} />

        {/* Extra pages */}
        <Route path="my-reviews" element={<UserReview />} />

        
      </Route>
    </Routes>
  );
};

export default UserRoutes;
