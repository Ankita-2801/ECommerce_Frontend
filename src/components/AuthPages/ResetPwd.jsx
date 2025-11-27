import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { KeyIcon, LockClosedIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { API_BASE_URL,API_ENDPOINTS } from '@/config/api';
function  ResetPwd () {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error,setError]=useState('');
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setMessage("Invalid or missing token.");
    }
  }, [searchParams]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/${API_ENDPOINTS.RESETPASSWORD}`,
        {
          token,
          newPassword: password,
        }
      );
      setSuccess(response.data.message);

      // Redirect to login page after successful reset
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.error || "Password reset failed.");
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white text-lg font-medium">
        {message}
      </div>
    );
  }
const handleBackToLogin = () => {
  navigate("/login");
};
  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans relative"
      style={{
        backgroundImage: `url("https://thumbs.dreamstime.com/b/fresh-grasses-sunset-sunrise-green-field-background-image-fresh-grasses-sunset-sunrise-green-field-background-image-363945571.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex-1 p-8 lg:p-12 flex justify-center items-center">
        <div className="max-w-md w-full mx-auto
                      bg-white/10 backdrop-blur-lg p-8 rounded-xl
                      shadow-2xl transition-all duration-300 hover:shadow-3xl text-gray-900">
          
          <h2 className="text-3xl font-extrabold mb-8 text-white border-b-2 border-emerald-400 pb-4 flex items-center">
            <KeyIcon className="h-8 w-8 text-emerald-400 mr-3" /> Reset Password
          </h2>

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center text-base">
              <LockClosedIcon className="h-5 w-5 mr-2" /> {success}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center text-base">
              <span className="font-bold mr-2">Error:</span> {error}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-white text-base md:text-lg font-semibold mb-2">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-gray-900 bg-white/70 backdrop-blur-sm text-base"
                value={password}
              onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-white text-base md:text-lg font-semibold mb-2">
                Confirm New Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-gray-900 bg-white/70 backdrop-blur-sm text-base"
                value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-emerald-300 text-lg"
            >
              Reset Password
            </button>
          </form>

          <button
            onClick={handleBackToLogin}
            className="mt-8 w-full flex items-center justify-center text-center text-white  transition-colors duration-200 text-base"
          >
            <ArrowUturnLeftIcon className="h-5 w-5 mr-2" /> Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPwd;