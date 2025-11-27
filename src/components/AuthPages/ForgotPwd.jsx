import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MailCheck, ArrowLeft, X } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL,API_ENDPOINTS } from '@/config/api.js';
const ForgotPwd = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/${API_ENDPOINTS.FORGOTPASSWORD}`,
        { email }
      );
      setMessage(response.data.message);
      toast.success(response.data.message);
      setOtpSent(true);
      setEmailSubmitted(true);
      setShowOtpModal(true);
    } catch (error) {
      const errMsg = error.response?.data?.error || "Something went wrong.";
      setMessage(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/${API_ENDPOINTS.VERIFYOTP}`,
        { email, otp }
      );
      toast.success("OTP Verified!");
      navigate(`/reset?token=${response.data.token}`);
    } catch (error) {
      const errMsg = error.response?.data?.error || "Invalid OTP.";
      setMessage(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/${API_ENDPOINTS.FORGOTPASSWORD}`,
        { email }
      );
      toast.success("OTP Resent!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url('https://t4.ftcdn.net/jpg/02/25/67/69/360_F_225676952_RKe5I3oSq6vLgnX16GRhquWWIFbnfQ3x.jpg')] min-h-screen flex items-center justify-center bg-cover bg-center px-4">
      <div className="bg-white/30 backdrop-blur-xl shadow-2xl rounded-2xl p-10 w-full max-w-md border border-white/40">
        <div className="flex flex-col items-center">
          <MailCheck className="h-16 w-16 text-green-900 mb-4" />
          <h2 className="text-3xl font-bold text-green-900 drop-shadow mb-2">Forgot Password?</h2>
          <p className="text-green-800 text-center mb-6">
            Enter your registered email ID to receive a verification OTP.
          </p>
        </div>

        {/* Email Input Form */}
        <form onSubmit={handleForgotPassword} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-green-900 font-medium mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-300 text-slate-700 placeholder-slate-500"
              placeholder="you@example.com"
              disabled={loading || emailSubmitted}
            />
          </div>
          <button
            type="submit"
            disabled={loading || emailSubmitted}
            className="w-full bg-gradient-to-r from-green-800 via-green-500 to-green-800 text-black font-bold py-3 rounded-xl text-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && !emailSubmitted ? 'Sending OTP...' : (emailSubmitted ? 'OTP Sent!' : 'Send OTP')}
          </button>
        </form>

        {/* OTP Verification Modal */}
        {showOtpModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 shadow-2xl relative w-full max-w-sm">
              <button
                onClick={() => setShowOtpModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                disabled={loading}
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Verify OTP</h3>
              <p className="text-gray-600 text-center mb-6">
                Please enter the 6-digit OTP sent to <span className="font-semibold">{email}</span>.
              </p>
              <form onSubmit={handleOtpVerification} className="space-y-5">
                <div>
                  <label htmlFor="otp" className="block text-gray-700 font-medium mb-1 sr-only">Enter OTP</label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="------"
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="w-full text-sm text-blue-600 font-medium mt-3 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Resend OTP
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Feedback Messages */}
        <ToastContainer position="top-center" autoClose={3000} />

        {/* Back to Login Link */}
        <div className="mt-6 text-center flex items-center justify-center gap-2">
          <ArrowLeft className="h-5 w-5 text-green-900" />
          <Link
            to="/login"
            className="text-green-900 font-medium underline hover:text-black transition duration-300"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPwd;
