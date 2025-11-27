
import React, { useState, useEffect } from 'react';
// Importing professional icons from Lucide React
import { Check, X } from 'lucide-react';


const OrderDetails = ({ order, onClose, onStatusChange }) => {
    const [status, setStatus] = useState(order?.status || 'Pending');

    const statuses = [
        'Pending',
        'Processing',
        'Out for Delivery',
        'Delivered',
        'Cancelled'
    ];

    // Update local state if the order prop changes
    useEffect(() => {
        if (order) {
            setStatus(order.status);
        }
    }, [order]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (status && status !== order.status) {
            onStatusChange(order.id, status); // Pass updated status to parent
        }
        onClose();
    };

    if (!order) {
        return <p className="p-4 text-center text-gray-500">Select an order to view details.</p>;
    }

    return (
        // Container: Adjusted padding and spacing for mobile vs desktop
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 text-left p-2 md:p-4">
            
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">
                Order Details
            </h3>

            {/* Static Order Information */}
            <div className="space-y-2 md:space-y-3 p-3 md:p-4 bg-blue-50 rounded-lg border border-gray-100">
                <p className="text-sm md:text-lg">
                    <span className="font-semibold text-gray-700 block sm:inline">Order ID:</span>{' '}
                    <span className="break-all">{order.id}</span>
                </p>
                <p className="text-sm md:text-lg">
                    <span className="font-semibold text-gray-700 block sm:inline">Customer:</span>{' '}
                    <span className="break-words">{order.user}</span>
                </p>
                <p className="text-sm md:text-lg">
                    <span className="font-semibold text-gray-700 block sm:inline">Amount:</span>{' '}
                    {order.amount}
                </p>
            </div>

            {/* Payment Information */}
            <div className="space-y-2 md:space-y-3 p-3 md:p-4 bg-green-50 rounded-lg border border-gray-100">
                <p className="text-sm md:text-lg">
                    <span className="font-semibold text-gray-700">Payment Method:</span> {order.payment?.method || '-'}
                </p>
                <p className="text-sm md:text-lg flex items-center flex-wrap gap-2">
                    <span className="font-semibold text-gray-700">Payment Status:</span>
                    <span className={`font-medium ${
                        order.payment?.status === 'Completed' ? 'text-green-600' :
                        order.payment?.status === 'Pending' ? 'text-yellow-600' :
                        'text-red-600'
                    }`}>
                        {order.payment?.status || '-'}
                    </span>
                </p>
                {order.transactionId && (
                    <p className="text-sm md:text-lg">
                        <span className="font-semibold text-gray-700 block sm:inline">Transaction ID:</span>{' '}
                        <span className="break-all text-xs md:text-lg">{order.transactionId}</span>
                    </p>
                )}
            </div>

            {/* Status Update Dropdown */}
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Update Status
                </label>
                <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={handleStatusChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-base py-2.5 px-3 bg-white transition-colors duration-200"
                >
                    {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {/* Form Actions */}
            {/* Mobile: Column (stack buttons), Desktop: Row (side by side) */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-2.5 flex items-center justify-center space-x-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
                >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                </button>
                <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 flex items-center justify-center space-x-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                    <Check className="h-4 w-4" />
                    <span>Save Changes</span>
                </button>
            </div>
        </form>
    );
};

export default OrderDetails;