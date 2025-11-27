// Offers.jsx
import React, { useState } from 'react';
import { Send, Gift, Loader2 } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api.js';

const Offers = () => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(null); // null, 'success', or 'error'

    const handleSendOffer = async (e) => {
        e.preventDefault();

        if (!subject.trim() || !body.trim()) {
            alert('Please enter both a subject and a body for the offer email.');
            return;
        }

        setIsSending(true);
        setSendSuccess(null);

        const token = localStorage.getItem("token");

        if (!token) {
            alert('Authentication failed. Please log in again.');
            setIsSending(false);
            return;
        }

        console.log('Attempting to send bulk email:', { subject, body });

        try {
            const response = await axios.post(
                `${API_BASE_URL}/${API_ENDPOINTS.BULK_EMAIL_SEND}`,
                { subject, body },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                setSendSuccess('success');
                setSubject('');
                setBody('');
            } else {
                setSendSuccess('error');
            }

        } catch (error) {
            console.error('Error sending bulk email:', error.response?.data?.message || error.message);
            const errorMessage = error.response?.data?.message || 'Failed to connect to the email server.';
            
            if (error.response?.status === 403) {
                 alert(`Authorization failed: ${errorMessage}`);
            } else {
                 alert(`Sending failed: ${errorMessage}`);
            }
            
            setSendSuccess('error');
        } finally {
            setIsSending(false);
            setTimeout(() => setSendSuccess(null), 5000); 
        }
    };

    return (
        // Responsive Container: p-4 on mobile, p-8 on desktop, centered max-width
        <div className="p-4 md:p-8 bg-white/5 backdrop-blur-md rounded-xl shadow-2xl min-h-full text-gray-100 max-w-4xl mx-auto">
            
            {/* Header: Flex column on mobile, Row on Desktop */}
            <header className="flex flex-col md:flex-row items-center md:items-start gap-4 border-b border-lime-700/50 pb-6 mb-6 md:mb-8 text-center md:text-left">
                <div className="p-3 bg-lime-900/30 rounded-full">
                    <Gift className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wider">
                        Bulk Offer & Promotion Sender
                    </h1>
                    <p className="text-sm md:text-base text-gray-400 mt-1">
                        Reach all your customers instantly.
                    </p>
                </div>
            </header>

            <section className="w-full">
                <p className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed">
                    Compose a marketing email below. This will be sent to 
                    <strong className="text-lime-300 ml-1">ALL registered customers</strong>.
                </p>

                <form onSubmit={handleSendOffer} className="space-y-5 md:space-y-6">
                    
                    {/* Subject Field */}
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-lime-400 mb-2">
                            Email Subject Line
                        </label>
                        <input
                            id="subject"
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            disabled={isSending}
                            className="w-full p-3 text-sm md:text-base bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors placeholder-gray-500"
                            placeholder="e.g., 20% OFF All GreenRemedy Products!"
                            required
                        />
                    </div>

                    {/* Body/Content Field */}
                    <div>
                        <label htmlFor="body" className="block text-sm font-medium text-lime-400 mb-2">
                            Email Body Content
                        </label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            disabled={isSending}
                            // Responsive height using tailwind classes instead of fixed rows
                            className="w-full h-48 md:h-64 p-3 md:p-4 text-sm md:text-base bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors resize-y placeholder-gray-500"
                            placeholder="Write your special offer details, coupon codes, and link to your store here..."
                            required
                        />
                    </div>

                    {/* Send Button */}
                    <button
                        type="submit"
                        disabled={isSending}
                        className={`w-full flex items-center justify-center gap-3 px-6 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 shadow-lg ${
                            isSending
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-lime-500 hover:bg-lime-600 text-lime-900 transform hover:scale-[1.01] active:scale-[0.98] ring-2 ring-lime-400/50'
                        }`}
                    >
                        {isSending ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Send Email to All Customers
                            </>
                        )}
                    </button>
                    
                    {/* Status Message */}
                    {sendSuccess === 'success' && (
                        <div className="mt-4 p-4 bg-green-900/50 border border-green-500 rounded-lg text-green-300 text-center text-sm md:text-base font-semibold animate-fade-in">
                            ✅ Success! Bulk email campaign has been successfully queued.
                        </div>
                    )}
                    {sendSuccess === 'error' && (
                        <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-300 text-center text-sm md:text-base font-semibold animate-fade-in">
                            ❌ Error! Failed to send offers. Check console/logs.
                        </div>
                    )}
                </form>
            </section>
        </div>
    );
};

export default Offers;