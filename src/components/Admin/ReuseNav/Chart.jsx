// src/components/ReuseNav/Chart.jsx

import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

/**
 * A reusable Line Chart component for the admin dashboard.
 *
 * @param {Array<object>} data - The data to be displayed on the chart.
 * @param {string} title - The title of the chart.
 */
const Chart = ({ data, title }) => {
    return (
        // The chart container is styled to match the dark theme of the dashboard.
        <div className="bg-fuchsia-50 p-8 rounded-3xl shadow-2xl border border-gray-800 h-96">
            {/* The title of the chart */}
            <h3 className="text-xl font-semibold text-gray-300 mb-6">{title}</h3>

            {/* Responsive container to ensure the chart scales correctly */}
            <ResponsiveContainer width="100%" height="85%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    {/* The grid lines are a darker gray to contrast with the dark background */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />

                    {/* The axis labels are a light gray for readability */}
                    <XAxis dataKey="name" stroke="#000000" />
                    <YAxis stroke="#000000" />

                    {/* Tooltip with a dark, semi-transparent background for a sleek look */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(31, 41, 55, 0.8)',
                            borderColor: '#4b5563',
                            color: '#d1d5db',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                        labelStyle={{ color: '#d1d5db', fontWeight: 'bold' }}
                    />

                    {/* The Legend for the different data lines */}
                    <Legend />

                    {/* The 'sales' line with a primary violet color */}
                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#8b5cf6" // A vibrant violet
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                    />

                    {/* The 'revenue' line with a vibrant cyan color that complements the violet */}
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#06b6d4" // A cool cyan
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;