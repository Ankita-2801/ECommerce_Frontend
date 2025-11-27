// src/components/Admin/Routes/AdminRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Admin/ReuseNav/Layout.jsx';
import Dashboard from '@/components/Admin/Pages/Dashboard.jsx';
import Products from '@/components/Admin/Pages/Products.jsx';
import OrderStatus from '@/components/Admin/Pages/OrderStatus.jsx';
import UserDetails from '@/components/Admin/Pages/UserDetails.jsx';
import AdminReview from '@/components/Admin/Pages/AdminReview.jsx'
import Offers from '@/components/Admin/Pages/Offers.jsx';
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<OrderStatus />} />
        <Route path="users" element={<UserDetails />} />
        <Route path="reviews" element={<AdminReview />} />
         <Route path="offers" element={<Offers/>} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
