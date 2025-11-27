import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

/**
 * A reusable card component for key metrics like revenue, users, etc.
 *
 * Props:
 * @param {string} title - The metric name (e.g., "Total Sales")
 * @param {string | number} value - The value to show (e.g., "$12,000")
 * @param {React.ReactNode} icon - The icon to display (React element)
 * @param {string} iconColor - Tailwind color (e.g., "blue", "green")
 * @param {string} change - Text for change % (e.g., "+4.3%")
 * @param {boolean} isPositive - true if change is positive
 * @param {number[]} chartData - Array of numbers for sparkline
 */
const Card = ({
  title = 'Title',
  value = '0',
  icon,
  iconColor = 'blue',
  change = '0%',
  isPositive = true,
  chartData = [],
}) => {
  const [pathLength, setPathLength] = useState(0);

const safeData = chartData.length > 1 ? chartData : [0, 0];
const maxValue = Math.max(...safeData, 1);

const points = safeData
  .map((d, i) => {
    const x = safeData.length > 1 ? (i / (safeData.length - 1)) * 100 : 0;
    const y = 100 - (d / maxValue) * 100;
    return `${x},${y}`;
  })
  .join(' ');


  useEffect(() => {
    const pathElement = document.getElementById(`chart-path-${title}`);
    if (pathElement) {
      setPathLength(pathElement.getTotalLength());
    }
  }, [safeData, title]);

  // Create a safe ID for SVG defs by replacing spaces with dashes
  const gradientId = `gradient-${title.replace(/\s+/g, '-')}`;

  return (
    <div
      className={`flex flex-col p-6 rounded-3xl transition-all duration-300 ease-in-out hover:scale-[1.02] relative overflow-hidden group shadow-xl 
      ${
        iconColor === 'green'
          ? 'bg-gradient-to-br from-green-50 to-green-100 text-green-500'
          : iconColor === 'red'
          ? 'bg-gradient-to-br from-red-50 to-red-100 text-red-500'
          : iconColor === 'gray'
          ? 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-500'
          : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-500'
      }`}
    >
      {/* Subtle background pattern to add texture */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L100,100 M100,0 L0,100"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.2"
          />
        </svg>
      </div>

      {/* Card Content Wrapper */}
      <div className="relative z-10 flex flex-col w-full h-full">
        {/* Top section: Icon, Title, and Percentage Change */}
        <div className="flex justify-between items-start mb-4">
          {/* Hexagonal Icon Container */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* The hexagon shape, filled with the provided color */}
            <svg
              className={`absolute inset-0 w-full h-full fill-current`}
              viewBox="0 0 100 100"
            >
              <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
            </svg>
            {/* The actual icon, centered on top of the hexagon */}
            <div className="relative text-white z-10 w-6 h-6">{icon}</div>
          </div>

          {/* Percentage change */}
          <div
            className={`flex items-center text-sm font-semibold ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isPositive ? (
              <ArrowUp className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 mr-1" />
            )}
            <span>{change}</span>
          </div>
        </div>

        {/* Value and title */}
        <div className="flex flex-col">
          <span className="text-gray-800 text-3xl font-bold">{value}</span>
          <span className="text-gray-500 text-sm font-medium mt-1">{title}</span>
        </div>

        {/* Chart with gradient fill under the sparkline */}
        <div className="mt-4">
          <svg
            className="w-full h-16"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Filled area under the line */}
            <polygon
              fill={`url(#${gradientId})`}
              points={`0,100 ${points} 100,100`}
            />

            {/* The actual line */}
            <polyline
  id={`chart-path-${title}`}
  fill="none"
  stroke="currentColor"
  strokeWidth="4"
  points={points}
  className="transition-all duration-1000 ease-out animate-dash"
  style={{
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  }}
/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Card;
