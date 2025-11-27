// src/components/Admin/Users.jsx

import React, { useState, useEffect } from 'react';
import { API_BASE_URL,API_ENDPOINTS } from '@/config/api.js';
import Table from '../ReuseNav/Table';
import Modal from '../ReuseNav/Modal';
import UserProfile from '../ReuseNav/UserProfile';
import { useLocation } from 'react-router-dom';
// Importing professional icons from Lucide React
import { Eye } from 'lucide-react';


const UserDetails = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null); // Highlighted row
    const location = useLocation();
      //  Auto-remove highlight after 2 seconds
  useEffect(() => {
    const idFromSearch = localStorage.getItem('highlightId');
    if (idFromSearch) {
      setSelectedUserId(idFromSearch);

      const timer = setTimeout(() => {
        setSelectedUserId(null);
        localStorage.removeItem('highlightId');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [location]);

  //  Scroll highlighted row into view
  useEffect(() => {
    if (selectedUserId) {
      const rowEl = document.getElementById(`row-${selectedUserId}`);
      if (rowEl) rowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedUserId]);
    // Simulates fetching user data from an API
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/${API_ENDPOINTS.USER_DETAILS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      const formatted = data.filter(user => user.role !== 'admin') 
       .map(user => ({
        id: user._id,
        name: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      }));

      setUsers(formatted);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchUsers();
}, []);
        if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                {/* Updated loader with new colors */}
                <div className="flex flex-col items-center space-y-4 text-white">
                    <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-lg font-medium">Loading Total User's...</span>
                </div>
            </div>
        );
    }

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
         { header: 'Phone Number', accessor: 'phone' },
        { header: 'Role', accessor: 'role' },
    ];

    const handleViewProfile = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // This function renders the 'View Profile' button for the 'Actions' column
    const actions = (row) => (
        <div className="flex space-x-2 justify-end">
            <button
                onClick={() => handleViewProfile(row)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                title="View Profile"
            >
                <Eye className="h-5 w-5" />
            </button>
        </div>
    );

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">User Management</h1>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-600 text-lg animate-pulse">Loading users...</p>
                </div>
            ) : (
                <Table columns={columns} data={users} actions={actions} selectedId={selectedUserId} onRowClick={(id) => setSelectedUserId(id)}// Highlight row
 />
            )}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <UserProfile user={selectedUser} onClose={handleCloseModal} />
            </Modal>
        </div>
    );
};
export default UserDetails;
