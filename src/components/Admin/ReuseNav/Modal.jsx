import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { XCircle } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") onClose();
  };

  const modalContent = (
    <div
      id="modal-overlay"
      onClick={handleOutsideClick}
      // Added p-4 to ensure modal doesn't touch screen edges on mobile
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      <div
        className="
          relative 
          w-full max-w-lg 
          bg-blue-50 
          rounded-xl shadow-2xl 
          max-h-[90vh] 
          overflow-y-auto 
          scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
        "
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors z-20 p-1 rounded-full hover:bg-gray-200/50"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <XCircle size={24} />
        </button>
        
        {/* Responsive padding: p-4 on mobile, p-6 on desktop */}
        <div className="p-4 pt-10 md:p-6 md:pt-12">
            {children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
};

export default Modal;