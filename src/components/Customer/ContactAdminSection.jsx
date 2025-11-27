// ContactUsPage.jsx
import React from "react";
import { 
  ChatBubbleBottomCenterTextIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  BoltIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon 
} from "@heroicons/react/24/outline";

const ContactUsPage = () => {
  const adminEmail = "pfuture664@gmail.com";
  const emailSubject = encodeURIComponent("Inquiry from Website");
  const emailBody = encodeURIComponent("Dear Support Team,");
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${adminEmail}&su=${emailSubject}&body=${emailBody}`;

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4 md:px-20">
      <h1 className="text-4xl font-bold text-green-900 text-center mb-10">Contact Us</h1>

      {/* About Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-10 border-l-8 border-green-400">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">About PFUTURE 🌱</h2>
        <p className="text-green-700 mb-3">
          GreenRemedy🌱 is committed to delivering innovative technology solutions with sustainability in mind. We craft our products with quality, reliability, and your satisfaction as our top priorities.
        </p>
        <p className="text-green-700 mb-3">
          Our mission is to empower users through cutting-edge technology, while maintaining eco-friendly practices. We believe in transparent communication and excellent support for all our customers.
        </p>
        <p className="text-green-700">
          Explore our products and let us help you achieve your tech goals in a sustainable way.
        </p>
      </div>

      {/* Contact Info Section */}
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-green-200 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-green-900 flex items-center border-b border-green-300 pb-3">
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-green-500 mr-2" /> Contact Admin
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Contact Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="h-6 w-6 text-green-500" />
              <p>Email: <span className="font-semibold">{adminEmail}</span></p>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="h-6 w-6 text-green-500" />
              <p>Phone: <span className="font-semibold">+1 (800) 123-4567</span></p>
            </div>
            <div className="flex items-center gap-3">
              <MapPinIcon className="h-6 w-6 text-green-500" />
              <p>Address: <span className="font-semibold">123 PFUTURE St, Tech City, USA</span></p>
            </div>

            {/* Gmail Button */}
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition transform hover:scale-105"
            >
              Send an Email via Gmail
            </a>
          </div>

          {/* Right: Feature Highlights */}
          <div className="bg-green-100 rounded-xl p-6 flex flex-col justify-center items-start shadow-md space-y-4">
            <h3 className="text-xl font-semibold mb-2 text-green-900">Why Choose GreenRemedy🌱?</h3>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-center gap-2"><BoltIcon className="h-5 w-5 text-green-500" /> High-quality tech products</li>
              <li className="flex items-center gap-2"><ShieldCheckIcon className="h-5 w-5 text-green-500" /> Secure & reliable experience</li>
              <li className="flex items-center gap-2"><GlobeAltIcon className="h-5 w-5 text-green-500" /> Sustainable & eco-friendly</li>
              <li className="flex items-center gap-2"><BoltIcon className="h-5 w-5 text-green-500" /> 24/7 dedicated support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-10 text-green-700 text-sm">
        <p>&copy; {new Date().getFullYear()} PFUTURE. All rights reserved.</p>
        
      </div>
    </div>
  );
};

export default ContactUsPage;
