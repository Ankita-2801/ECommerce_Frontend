import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ChevronDown, Search, X, ArrowLeft } from 'lucide-react';

import Modal from './Modal.jsx';
import UserProfile from './UserProfile.jsx';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api.js';


const useDebounce = (value, delay) => {
    const [v, setV] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setV(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return v;
};


const SearchResults = ({ results, isLoading, query, navigate, closeMobileSearch }) => {
    if (isLoading)
        return <div className="p-4 text-center text-gray-400">Searching...</div>;

    if (!query || query.length < 2)
        return <div className="p-4 text-center text-gray-400">Type at least 2 characters.</div>;

    const noResults =
        results.users.length === 0 &&
        results.products.length === 0 &&
        results.orders.length === 0;

    if (noResults)
        return (
            <div className="p-4 text-center text-gray-400">
                No items found for "{query}".
            </div>
        );

    const ResultGroup = ({ title, data, renderItem }) =>
        data.length > 0 && (
            <div className="mb-4">
                <h3 className="text-xs font-semibold uppercase text-violet-400 mb-2 border-b border-gray-700 pb-1">
                    {title} ({data.length})
                </h3>
                <ul className="space-y-1">{data.slice(0, 5).map(renderItem)}</ul>
            </div>
        );

    const handleNav = (path, id) => {
        if (id) localStorage.setItem('highlightId', id);
        if (closeMobileSearch) closeMobileSearch();
        navigate(path);
    };

    const formatLink = (link, type) => {
        let redirectPath = '/';
        if (type === 'product') redirectPath = `/${API_ENDPOINTS.ADD_PRODUCTS}`;
        if (type === 'order') redirectPath = `/${API_ENDPOINTS.ORDER_SEARCH}`;
        if (type === 'user') redirectPath = `/${API_ENDPOINTS.USER_DETAILS}`;

        const id = link.split('/').pop();

        return (
            <button
                onClick={() => handleNav(redirectPath, id)}
                className="text-xs font-medium text-violet-400 hover:text-violet-300 hover:underline transition"
            >
                View
            </button>
        );
    };

    return (
        <div className="p-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
            <ResultGroup
                title="Users"
                data={results.users}
                renderItem={(item) => (
                    <li
                        key={item._id}
                        className="flex justify-between items-center py-2 border-b border-gray-700/50 last:border-0"
                    >
                        <span className="text-white text-sm truncate max-w-[75%]">
                            {item.username}
                        </span>
                        {formatLink(item.link, 'user')}
                    </li>
                )}
            />

            <ResultGroup
                title="Products"
                data={results.products}
                renderItem={(item) => (
                    <li
                        key={item._id}
                        className="flex justify-between items-center py-2 border-b border-gray-700/50 last:border-0"
                    >
                        <span className="text-white text-sm truncate max-w-[75%]">
                            {item.name}
                        </span>
                        {formatLink(item.link, 'product')}
                    </li>
                )}
            />

            <ResultGroup
                title="Orders"
                data={results.orders}
                renderItem={(item) => (
                    <li
                        key={item._id}
                        className="flex justify-between items-center py-2 border-b border-gray-700/50 last:border-0"
                    >
                        <span className="text-white text-sm truncate max-w-[75%]">
                            Order {item._id.slice(-6)}
                        </span>
                        {formatLink(item.link, 'order')}
                    </li>
                )}
            />
        </div>
    );
};


const Header = ({ adminName }) => {
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({
        users: [],
        products: [],
        orders: [],
    });
    const [isSearching, setIsSearching] = useState(false);

    const debounceSearch = useDebounce(searchTerm, 500);

    const [adminProfile, setAdminProfile] = useState(null);

    const menuRef = useRef(null);
    const searchRef = useRef(null);

   
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const res = await axios.get(
                    `${API_BASE_URL}/${API_ENDPOINTS.ADMIN_PROFILE}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setAdminProfile(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        loadProfile();
    }, []);

    const doSearch = useCallback(async (q) => {
        if (!q || q.length < 2) {
            setSearchResults({ users: [], products: [], orders: [] });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            setIsSearching(true);
            const res = await axios.get(
                `${API_BASE_URL}/${API_ENDPOINTS.ADMIN_SEARCH}?q=${q}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSearchResults(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsSearching(false);
        }
    }, []);

    useEffect(() => {
        doSearch(debounceSearch);
    }, [debounceSearch, doSearch]);

    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults({ users: [], products: [], orders: [] });
    };

    const closeMobileSearch = () => {
        setShowMobileSearch(false);
        clearSearch();
    };

    const currentAdmin =
        adminName ||
        adminProfile?.username ||
        localStorage.getItem('loggedUser') ||
        'Admin';

    
    return (
        <div className="relative flex items-center justify-between w-full h-16 px-2 sm:px-4">

            
            <div
                className="hidden md:block relative w-1/3 min-w-[200px] max-w-lg"
                ref={searchRef}
            >
                <Search className="absolute left-3 top-2.5 text-gray-700/70 h-5 w-5" />

                <input
                    type="text"
                    placeholder="Search anything..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 bg-white/90 shadow-sm rounded-lg text-gray-900 border border-transparent focus:ring-2 focus:ring-lime-500 outline-none"
                />

                {searchTerm && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-2.5 text-gray-600 hover:text-black"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}

                {(searchTerm.length >= 2 || isSearching) && (
                    <div className="absolute w-full mt-2 bg-gray-800 rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 z-50">
                        <SearchResults
                            results={searchResults}
                            isLoading={isSearching}
                            query={searchTerm}
                            navigate={navigate}
                        />
                    </div>
                )}
            </div>

         
            <button
                onClick={() => setShowMobileSearch(true)}
                className="md:hidden p-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-full"
            >
                <Search className="h-6 w-6" />
            </button>

         {/*Mobile search */}
            {showMobileSearch && (
                <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-md z-[60] flex flex-col px-4 pt-6">

                    <div className="flex items-center gap-3 w-full pb-4 border-b border-gray-700">
                        <button
                            onClick={closeMobileSearch}
                            className="p-2 text-gray-400 hover:text-white"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </button>

                        <div className="relative flex-1">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search users, products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-4 pr-10 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
                            />

                            {searchTerm && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-3 top-3 text-gray-300"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 overflow-y-auto flex-1">
                        {(searchTerm.length >= 2 || isSearching) ? (
                            <SearchResults
                                results={searchResults}
                                isLoading={isSearching}
                                query={searchTerm}
                                navigate={navigate}
                                closeMobileSearch={closeMobileSearch}
                            />
                        ) : (
                            <div className="text-center text-gray-500 mt-10">
                                <Search className="h-12 w-12 mx-auto opacity-20 mb-3" />
                                <p>Search for items...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            
            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 bg-lime-700 hover:bg-lime-800 px-3 py-2 rounded-full"
                >
                    <div className="bg-lime-400 text-lime-900 font-semibold rounded-full h-8 w-8 flex items-center justify-center">
                        {currentAdmin.charAt(0).toUpperCase()}
                    </div>

                    <span className="hidden sm:block text-white">{currentAdmin}</span>

                    <ChevronDown
                        className={`hidden sm:block text-white transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                setIsProfileModalOpen(true);
                            }}
                            className="block px-4 py-2 w-full text-left text-gray-300 hover:bg-gray-700"
                        >
                            Profile
                        </button>

                        <div className="border-t border-gray-700"></div>

                        <a
                            href="/"
                            className="block px-4 py-2 text-left text-red-400 hover:bg-gray-700"
                        >
                            Log Out
                        </a>
                    </div>
                )}
            </div>

            {/* Profile Modal */}
            {adminProfile && (
                <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
                    <UserProfile
                        user={adminProfile}
                        onClose={() => setIsProfileModalOpen(false)}
                    />
                </Modal>
            )}
        </div>
    );
};

export default Header;
