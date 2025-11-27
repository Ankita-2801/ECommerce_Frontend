import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Header from '../ReuseNav/Header';
import { Home, ShoppingCart, ClipboardList, Users, Box, MessageSquareText, Gift, Send, Menu, X } from 'lucide-react';

//  Sidebar Component 
// Added onClose prop for mobile to close the menu when a link is clicked
const Sidebar = ({ onClose, className = "" }) => {
    const navLinks = [
        { name: 'Dashboard', path: 'dashboard', icon: Home },
        { name: 'Products', path: 'products', icon: ShoppingCart },
        { name: 'Orders', path: 'orders', icon: ClipboardList },
        { name: 'Users', path: 'users', icon: Users },
        { name: 'Reviews', path: 'reviews', icon: MessageSquareText },
        { name: 'Offers', path: 'offers', icon: Gift },
    ];

    return (
        <aside className={`w-64 bg-lime-900/95 backdrop-blur-md text-white h-full shadow-2xl border-r border-gray-950 flex flex-col ${className}`}>

            {/* Header / Logo Area */}
            <div className="flex items-center justify-between px-6 pt-6 pb-6 mb-2 border-b border-gray-700">
                <div className="flex items-center gap-3 text-xl font-extrabold text-lime-400 tracking-wide">
                    <Box className="h-7 w-7 animate-pulse" />
                    <span>GreenRemedy</span>
                </div>
                {/* Close Button (Visible only on Mobile via CSS in Layout) */}
                <button onClick={onClose} className="md:hidden text-gray-300 hover:text-white">
                    <X className="h-6 w-6" />
                </button>
            </div>

            {/* Navigation links container */}
            <nav className="space-y-2 px-4 flex-1 overflow-y-auto">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={onClose} // Close sidebar on click (mobile UX)
                            end
                            className={({ isActive }) =>
                                `group flex items-center space-x-4 w-full p-3 rounded-lg transition-all duration-200 ease-in-out font-medium
                                ${isActive
                                    ? 'bg-lime-700/50 text-white shadow-xl translate-x-1 border-l-4 border-lime-400'
                                    : 'hover:bg-lime-800 hover:text-lime-200 border-l-4 border-transparent'}`
                            }
                        >
                            <Icon
                                className={`h-5 w-5 transition-colors duration-200 text-gray-300 group-hover:text-lime-400`}
                            />
                            <span className="text-base">{link.name}</span>
                        </NavLink>
                    );
                })}
            </nav>
            
            <div className="p-4 text-xs text-center text-lime-200/40 pb-8">
                &copy; 2024 GreenRemedy Admin
            </div>
        </aside>
    );
};

// --- Layout Component ---
const Layout = ({ adminName }) => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSendOfferClick = () => {
        navigate('offers');
    };

    return (
        <div
            className="flex h-screen bg-cover bg-center bg-fixed text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/33559627/pexels-photo-33559627.jpeg?cs=srgb&dl=pexels-delot-33559627.jpg&fm=jpg')`,
            }}
        >
            {/*MOBILE SIDEBAR OVERLAY */}
            {/* Backdrop */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar (Responsive Logic) */}
            <div className={`
                fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0 
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
            </div>

            {/* MAIN CONTENT COLUMN  */}
            <div className="flex flex-col flex-1 min-w-0">

                {/* Top Bar */}
                <div className="flex items-center gap-3 sm:gap-6 px-4 sm:px-8 py-3 bg-lime-900/80 backdrop-blur-md shadow-xl z-10 border-b border-gray-800 transition-colors duration-300">
                    
                    {/* Hamburger Button (Mobile Only) */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-2 text-gray-200 hover:bg-lime-800 rounded-lg transition-colors"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Header Component (Search & Profile) */}
                    {/* flex-1 allows it to take up remaining space between hamburger and offer button */}
                    <div className="flex-1 min-w-0">
                        <Header adminName={adminName} />
                    </div>
                    
                    {/* Send Offer Button */}
                    <button
                        onClick={handleSendOfferClick}
                        className="bg-lime-500 hover:bg-lime-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] ring-2 ring-lime-400/50 whitespace-nowrap"
                        title="Send Bulk Offer"
                    >
                        <Send className="h-5 w-5" />
                        {/* Text hidden on small mobile screens, visible on larger screens */}
                        <span className="hidden sm:inline">Send Offer</span>
                    </button>
                    
                </div>

                {/* Main Content Scroll Area */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-white/5 dark:bg-black/5 backdrop-blur-md transition-colors duration-300 md:rounded-tl-3xl shadow-inner scrollbar-thin scrollbar-thumb-lime-700 scrollbar-track-transparent">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;