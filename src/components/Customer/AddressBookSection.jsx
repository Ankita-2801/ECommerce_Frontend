//AddressBookSection.jsx

import React from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";

const AddressBookSection = () => (
  <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md border border-gray-200">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-300 pb-3 flex items-center">
      <MapPinIcon className="h-6 w-6 text-cyan-600 mr-2" /> Address Book
    </h2>
    <div className="text-center py-8">
      <p className="text-gray-800 text-lg mb-4">No shipping addresses saved.</p>
      <p className="text-gray-700 text-md">Manage your delivery addresses here.</p>
      <button className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 px-5 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105">
        Add New Address
      </button>
    </div>
  </div>
);

export default AddressBookSection;