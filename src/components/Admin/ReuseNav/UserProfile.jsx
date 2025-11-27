import React, { useState, useEffect } from 'react';
import Table from '../ReuseNav/Table';
import { XCircle } from 'lucide-react';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api.js';

const UserProfile = ({ user, onClose }) => {
  const [userOrders, setUserOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [fetchedUser, setFetchedUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user?.email) return;

      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
`${API_BASE_URL}/${API_ENDPOINTS.USER_PROFILE}?email=${encodeURIComponent(user.email)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log("Raw backend response:", data); //  Debug log

        setFetchedUser(data.user || null);

        //  Format orders for the table
        const formattedOrders = (data.orders || []).map(o => ({
          id: o._id,
          items: o.products?.length || 0,
          total: `\u20B9${o.cartTotal}`,
          status: o.orderStatus
        }));

        console.log("Formatted orders:", formattedOrders); //  Debug log
        setUserOrders(formattedOrders);
      } catch (err) {
        console.error('Error fetching user details:', err);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  const displayUser = fetchedUser || user;

  const orderColumns = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Items', accessor: 'items' },
    { header: 'Total', accessor: 'total' },
    { header: 'Status', accessor: 'status' },
  ];

  if (!displayUser) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-gray-500">Select a user to view their profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-900">User Profile</h3>
      </div>

      {/* Profile Info */}
      <div className="bg-blue-50 p-6 rounded-xl shadow-inner border border-gray-200">
        <p className="text-base text-gray-800 font-medium">
          <span className="font-semibold text-gray-900">Name:</span> {displayUser.username}
        </p>
        <p className="text-base text-gray-800 font-medium">
          <span className="font-semibold text-gray-900">Email:</span> {displayUser.email}
        </p>
        <p className="text-base text-gray-800 font-medium">
          <span className="font-semibold text-gray-900">Phone Number:</span> {displayUser.phone}
        </p>
        <p className="text-base text-gray-800 font-medium">
          <span className="font-semibold text-gray-900">Role:</span> {displayUser.role}
        </p>
      </div>

     

      {/* Order History */}
      <div>
        <h4 className="text-xl font-bold text-gray-800 mb-4">Order History</h4>
        {isLoadingOrders ? (
          <div className="text-center text-sm text-gray-500 py-8">Loading order history...</div>
        ) : userOrders.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-8">No orders found.</div>
        ) : (
          <>
            <Table columns={orderColumns} data={userOrders} />
          </>
        )}
      </div>
      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 text-sm font-medium text-white bg-emerald-800 border border-gray-300 rounded-md shadow-sm hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserProfile;